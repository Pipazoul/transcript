import { Connection, Client, ScheduleOverlapPolicy } from '@temporalio/client';
import { watchPodcast } from './workflows';

export async function runSchedules() {
    const temporalHost = process.env.TEMPORAL_ADDRESS;
    // Connect to the default Server location
    const client = new Client({
    connection: await Connection.connect({address: temporalHost }),
    });

  //https://typescript.temporal.io/api/classes/client.ScheduleClient#create
  const watchPodcastSchedule = await client.schedule.create({
    action: {
      type: 'startWorkflow',
      workflowType: watchPodcast,
      //args: [''],
      taskQueue: 'main-queue',
    },
    scheduleId: 'watchPodcast-schedule',
    policies: {
      catchupWindow: '1h',
      overlap: ScheduleOverlapPolicy.SKIP,
    },
    spec: {
      intervals: [{ every: '15s' }]
    },
  });
  console.log(`Started schedule '${watchPodcastSchedule.scheduleId}'.`);

  await client.connection.close();
}

