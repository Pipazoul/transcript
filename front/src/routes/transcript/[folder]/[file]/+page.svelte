<script lang="ts">
    import { PUBLIC_S3_URL } from '$env/static/public'
    import { page } from '$app/stores';
    import { onMount, tick } from 'svelte';

    interface Segments {
        avg_logprob: number;
        end: number;
        speaker: string;
        start: number;
        text: string;
    }

    interface Transcript {
        completed_at: string;
        input: {
            file_url: string;
            language: string;
        },
        output: {
            language: string;
            num_speakers: number;
            segments: Segments[];
        }
    }

    interface Infos {
        title: string;
        link: string;
        pubDate: string;
        content: string;
        contentSnippet: string;
        guid: string;
        isoDate: string;
        enclosure: {
            url: string;
            length: number;
            type: string;
        };
        itunes: {
            summary: string;
            duration: number;
            image: string;
            episode: number;
            season: number;
            episodeType: string;
            explicit: string;
            block: string;
            title: string;
        };
    }

    let transcript: Transcript;
    let infos: Infos;
    const filename = $page.params.file;
    let player = {
        state: 'paused',
        currentTime: 0,
        duration: 0,
        volume: 0.5,
    };

    let sideInfos: SideInfos = {
        speak_time: [],
        most_used_words: [],
    }

    interface SideInfos {
        speak_time: SpeakTime[];
        total_duration: number;
        most_used_words: MostUsedWords[];
    }

    interface SpeakTime {
        speaker: string;
        duration: number;
    }

    interface MostUsedWords {
        speaker: string;
        words: Words;
    }

    interface Words {
        word: string;
        count: number;
    }


    let mounted = false;

    let audioElement: HTMLAudioElement;

    onMount(async () => {
        const res = await fetch(PUBLIC_S3_URL + "/" + $page.params.folder + '/' + $page.params.file);
        let json = await res.json();
        transcript = json[1];
        infos = json[0];
        player.duration = transcript.output.segments[transcript.output.segments.length - 1].end;
        audioElement.src = infos.enclosure.url;
        audioElement.load();  // Important if changing source dynamically

        console.log(sideInfos);

        // foreach speaker, calculate speak time 
        transcript?.output?.segments.forEach(segment => {
            // create speaker if not exists
            if (!sideInfos.speak_time.find(speaker => speaker.speaker === segment.speaker)) {
                sideInfos.speak_time.push({
                    speaker: segment.speaker,
                    duration: speakTime(segment.speaker),
                });
            }

            // check speaker most used words
            if (!sideInfos.most_used_words.find(speaker => speaker.speaker === segment.speaker)) {
                sideInfos.most_used_words.push({
                    speaker: segment.speaker,
                    words: speakerMostUsedWords(segment.speaker),
                });
            }
        });

        // sort by duration
        sideInfos.speak_time.sort((a, b) => b.duration - a.duration);

        sideInfos.total_duration = sideInfos.speak_time.reduce((acc, speaker) => acc + speaker.duration, 0);


        console.log(sideInfos);

        mounted = true;
    });

    function speakTime(speaker: string) {
        let speak_time = 0;
        transcript?.output?.segments.forEach(segment => {
            if (segment.speaker === speaker) {
                speak_time += segment.end - segment.start;
            }
        });
        return speak_time;
    }

    function speakerMostUsedWords(speaker: string) {
        let words = [];
        transcript?.output?.segments.forEach(segment => {
            if (segment.speaker === speaker) {
                words.push(segment.text.split(' '));
            }
        });
        return words;
    }

    function formatTime(time: number) {
        // HH:MM:SS format but check if hours or minutes are 0
        return new Date(time * 1000).toISOString().substr(11, 8).replace(/^[0:]+/, '');
    }

    function getPercentage(value: number, total: number) {
        console.log(value, total);
        return (value / total) * 100;
    }
    function togglePlayPause() {
        if (audioElement.paused) {
            audioElement.play();
            player.state = 'playing';
        } else {
            audioElement.pause();
            player.state = 'paused';
        }
    }

    // Synchronize slider with manual changes
    function handleTimeUpdate() {
        player.currentTime = audioElement.currentTime;
    }

    function setTimecode(timecode: number) {
        audioElement.currentTime = timecode;
        player.currentTime = timecode;
    }

    // Scroll to and highlight segment
    $: {
        transcript?.output?.segments.forEach(segment => {
            if (player.currentTime >= segment.start && player.currentTime < segment.end) {
                const element = document.getElementById(`segment-${segment.start}`);
                element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                element?.classList.add('border-4', 'border-primary');
            } else {
                const element = document.getElementById(`segment-${segment.start}`);
                element?.classList.remove('border-4', 'border-primary');
            }
        });
    }
</script>

<section class="p-4">
    {#if transcript}
    <div class="flex">
        <div class="h-screen overflow-y-scroll w-3/4">
            <div class="flex">
                <div class="w-1/4 h-52 bg-cover bg-center" style="background-image: url({infos.itunes.image});"></div>
                <div class="w-3/4 pl-4">
                    <h1 class="text-2xl font-bold">{infos.title}</h1>
                    <p class="text-sm">{infos.contentSnippet.slice(0, 500)}</p>
                    <p class="text-sm">Interlocuteurices: {transcript?.output?.num_speakers}</p>
                </div>
            </div>
            <div>
                {#each transcript?.output?.segments as segment}
                    <div class="card bg-base-100 shadow-xl mb-4" id={`segment-${segment.start}`} on:click={() => setTimecode(segment.start)}>
                        <div class="card-body">
                            <div class="flex">
                                <div class="avatar">
                                    <div class="w-12 rounded-full">
                                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                    </div>
                                </div>
                                <h2 class="card-title">{segment.speaker}</h2>
                            </div>
                            <p>{segment.text}</p>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
        <div class="pl-4">
            <h2 class="text-2xl font-bold">Infos</h2>
            <h3 class="text-xl font-bold">Temps de parole</h3>
            {#each sideInfos.speak_time as speak_time}
                <p>{speak_time.speaker} : {formatTime(speak_time.duration.toFixed())}</p>
                <progress class="progress w-56" value={getPercentage(speak_time?.duration?.toFixed(), sideInfos.total_duration.toFixed()) || 0} max="100"></progress>
            {/each}
        </div>
    </div>

    {/if}
    <div class="fixed bottom-0 left-0 bg-primary w-full p-4 flex items-center">
        <button class="btn btn-ghost" on:click={togglePlayPause}>
            {#if audioElement?.paused}
                Play
            {:else}
                Pause
            {/if}
        </button>
        <div>{Math.floor(player.currentTime)}</div>
        <input class="range w-full" type="range" min="0" max={player.duration} bind:value={player.currentTime} step="any" />
    </div>
    <audio bind:this={audioElement} on:timeupdate={handleTimeUpdate} hidden></audio>
</section>
