import { EpisodesResponse } from "../types/pocketbase-types";
import { pb } from "../utils/pocketbase";
const fetch = require('node-fetch');


export async function getPendingPodcasts() {
    console.log("🎧 Getting Pending Podcasts");
    const podcasts = await pb.collection('podcasts').getFullList()
    return podcasts
}


// export async function createEpisodeAudio(episode: EpisodesResponse) {
//     // FOR DEBUG ONLY 
//     // //await pb.collection("episodes").update(episode.id, { status: "done" })
//     // // check if already running http://dev-monode-tts:5000/predictions
//     // let healthcheck =  await fetch(`http://dev-monode-tts:5000/health-check`)
//     // healthcheck = await healthcheck.json()
//     // console.log(healthcheck.status)
//     // // if healthcheck status READY
//     // if (healthcheck.status != "READY") {
//     //     return
//     // }
//     const apiUrl = process.env.CONDUCTEUR_API_URL;
//     const apiKey = process.env.CONDUCTEUR_API_TOKEN;

//     console.log("🎧 Creating Episode Audio");
//     const episodeLang = detectAll(episode.text)
//     let lang = 'en-us'
//     let voice = "amy"
//     console.log("Detecting Language")
//     // ES FR ZH JP KR
//     switch (episodeLang[0].lang) {
//         case 'en':
//             lang = 'en-us'
//             voice = "amy"
//             break;
//         case 'es':
//             lang = 'es'
//             break;
//         case 'fr':
//             lang = 'fr'
//             voice = "tom"
//             break;
//         case 'zh':
//             lang = 'zh'
//             break;
//         default:
//             lang = 'en-us'
//             break;
//     }
//     console.log("Language Detected", lang)

//     const request = await fetch(`${apiUrl}/predict`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${apiKey}`,
//                 'Prefer': 'respond-async'
//             },
//             body: JSON.stringify({
//                 "image": "yassinsiouda/cog-piper:latest",
//                 "input": {
//                     "episode_id": episode.id,
//                     "text": episode.text,
//                     "lang": lang,
//                     "voice": voice
//                 },
//                 "webhook": `${process.env.API_URL}/webhook/prediction`,
//                 //"webhook_events_filter": ["start", "logs", "completed"]
//             }),
//     })
//     await pb.collection('episodes').update(episode.id, {
//         status: 'running',
//     })
//     return request
// }