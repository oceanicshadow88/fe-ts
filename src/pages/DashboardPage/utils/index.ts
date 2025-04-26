import { IDashBoardDailyScrum } from '../../../types';

interface IDashBoardDailyScrumModified
  extends Omit<IDashBoardDailyScrum, 'id' | 'user' | 'progresses'> {
  progresses: {
    timeStamp: string;
    value: number;
  }[];
}

export const convertProgressData = (
  input: IDashBoardDailyScrumModified[]
): ReadonlyArray<object> => {
  const result: any[] = [];

  // Extract all unique timestamps from the input
  const timestamps: string[] = input.reduce((acc: string[], item: IDashBoardDailyScrumModified) => {
    return acc.concat(
      item.progresses.map((progress: { timeStamp: string; value: number }) => progress.timeStamp)
    );
  }, []);

  const uniqueTimestamps = Array.from(new Set(timestamps));

  // Iterate over the timestamps and create a new object for each one
  uniqueTimestamps.forEach((timestamp) => {
    const obj: { name: string } = { name: timestamp };

    // Iterate over the items in the original input and add the progress value for each item to the new object
    input.forEach((item: IDashBoardDailyScrumModified) => {
      const progress = item.progresses.find((p) => p.timeStamp === timestamp);
      obj[item.title] = progress ? progress.value : 0;
    });

    result.push(obj);
  });

  return result;
};
