import { EpisodesRecord, EpisodesResponse, EpisodesStateOptions, PodcastsRecord } from "../types/pocketbase-types";
import { pb } from "../utils/pocketbase";
const fetch = require('node-fetch');
import { XMLParser } from "fast-xml-parser";
import { FormData } from "formdata-node";
import { Blob } from "buffer";


export async function getEpisodes(podcasts: Array<PodcastsRecord>): Promise<void> {
    console.log("🔌 👀 Get Episodes");
    const currentEpisodes = await pb.collection('episodes').getFullList();  // Move this outside the podcast loop
  
    for (const podcast of podcasts) {
      const req = await fetch(podcast.url);
      const text = await req.text();
      const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "@_"});
      const json = parser.parse(text);
      const episodes = json.rss.channel.item.slice(0, 2); // Fetch first 2 episodes directly
  
      for (const episode of episodes) {
        const episodeExists = currentEpisodes.find(e => e.url === episode.link);
        if (episodeExists) {
          console.log("🔌 Episode Exists", episodeExists);
          continue;
        }
  
        if (!episode.enclosure || !episode.enclosure["@_url"]) {
          console.log("🔌 Episode has no audio or missing URL", episode.enclosure)
          continue;
        }
        let episodeAudio = await fetch(episode.enclosure["@_url"]);
        const audioBuffer = await episodeAudio.buffer();
        const fileName = `${podcast.name}-${episode.title}.mp3`;
        const formData = new FormData();
        formData.append('audio', new Blob([audioBuffer]), fileName);
        const fileRecord = await pb.collection('episodes').create(formData);
        console.log("🔌 New Episode Created", fileRecord);
      }
    }
  }
  