// Add Workflow Definitions here.
import * as workflow from '@temporalio/workflow';
import type * as activities from './activities';


const {
   // Podcasts
   getPendingPodcasts,
   getEpisodes
} = workflow.proxyLocalActivities<typeof activities>({
    startToCloseTimeout: '20s',
    retry: {
        maximumAttempts: 2,
    }
});

export async function watchPodcast(): Promise<any> {
  console.log("🎧 👀 Watching Podcasts");
  const podcasts = await getPendingPodcasts();
  //console.log("🎧 Podcasts", podcasts);
  await getEpisodes(podcasts);
  return podcasts;
}