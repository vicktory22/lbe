import { isAfter, isBefore, parseISO } from "date-fns";
import { Context, Next } from "hono";

export async function weekMiddleware(c: Context, next: Next) {
  const week = getAllWeeks().find((week) => {
    return (
      isBefore(new Date(), parseISO(week.endDate)) &&
      isAfter(new Date(), parseISO(week.startDate))
    );
  });

  c.set("weekId", week?.weekNumber);

  await next();
}

function getAllWeeks() {
  return [
    {
      label: "HOF",
      startDate: "2023-08-01T07:00Z",
      endDate: "2023-08-09T06:59Z",
      seasonType: 1,
      weekNumber: 1,
      year: 2023,
    },
    {
      label: "Pre wk 1",
      startDate: "2023-08-09T07:00Z",
      endDate: "2023-08-16T06:59Z",
      seasonType: 1,
      weekNumber: 2,
      year: 2023,
    },
    {
      label: "Pre wk 2",
      startDate: "2023-08-16T07:00Z",
      endDate: "2023-08-23T06:59Z",
      seasonType: 1,
      weekNumber: 3,
      year: 2023,
    },
    {
      label: "Pre wk 3",
      startDate: "2023-08-23T07:00Z",
      endDate: "2023-09-07T06:59Z",
      seasonType: 1,
      weekNumber: 4,
      year: 2023,
    },
    {
      label: "Week 1",
      startDate: "2023-09-07T07:00Z",
      endDate: "2023-09-13T06:59Z",
      seasonType: 2,
      weekNumber: 1,
      year: 2023,
    },
    {
      label: "Week 2",
      startDate: "2023-09-13T07:00Z",
      endDate: "2023-09-20T06:59Z",
      seasonType: 2,
      weekNumber: 2,
      year: 2023,
    },
    {
      label: "Week 3",
      startDate: "2023-09-20T07:00Z",
      endDate: "2023-09-27T06:59Z",
      seasonType: 2,
      weekNumber: 3,
      year: 2023,
    },
    {
      label: "Week 4",
      startDate: "2023-09-27T07:00Z",
      endDate: "2023-10-04T06:59Z",
      seasonType: 2,
      weekNumber: 4,
      year: 2023,
    },
    {
      label: "Week 5",
      startDate: "2023-10-04T07:00Z",
      endDate: "2023-10-11T06:59Z",
      seasonType: 2,
      weekNumber: 5,
      year: 2023,
    },
    {
      label: "Week 6",
      startDate: "2023-10-11T07:00Z",
      endDate: "2023-10-18T06:59Z",
      seasonType: 2,
      weekNumber: 6,
      year: 2023,
    },
    {
      label: "Week 7",
      startDate: "2023-10-18T07:00Z",
      endDate: "2023-10-25T06:59Z",
      seasonType: 2,
      weekNumber: 7,
      year: 2023,
    },
    {
      label: "Week 8",
      startDate: "2023-10-25T07:00Z",
      endDate: "2023-11-01T06:59Z",
      seasonType: 2,
      weekNumber: 8,
      year: 2023,
    },
    {
      label: "Week 9",
      startDate: "2023-11-01T07:00Z",
      endDate: "2023-11-08T07:59Z",
      seasonType: 2,
      weekNumber: 9,
      year: 2023,
    },
    {
      label: "Week 10",
      startDate: "2023-11-08T08:00Z",
      endDate: "2023-11-15T07:59Z",
      seasonType: 2,
      weekNumber: 10,
      year: 2023,
    },
    {
      label: "Week 11",
      startDate: "2023-11-15T08:00Z",
      endDate: "2023-11-22T07:59Z",
      seasonType: 2,
      weekNumber: 11,
      year: 2023,
    },
    {
      label: "Week 12",
      startDate: "2023-11-22T08:00Z",
      endDate: "2023-11-29T07:59Z",
      seasonType: 2,
      weekNumber: 12,
      year: 2023,
    },
    {
      label: "Week 13",
      startDate: "2023-11-29T08:00Z",
      endDate: "2023-12-06T07:59Z",
      seasonType: 2,
      weekNumber: 13,
      year: 2023,
    },
    {
      label: "Week 14",
      startDate: "2023-12-06T08:00Z",
      endDate: "2023-12-13T07:59Z",
      seasonType: 2,
      weekNumber: 14,
      year: 2023,
    },
    {
      label: "Week 15",
      startDate: "2023-12-13T08:00Z",
      endDate: "2023-12-20T07:59Z",
      seasonType: 2,
      weekNumber: 15,
      year: 2023,
    },
    {
      label: "Week 16",
      startDate: "2023-12-20T08:00Z",
      endDate: "2023-12-27T07:59Z",
      seasonType: 2,
      weekNumber: 16,
      year: 2023,
    },
    {
      label: "Week 17",
      startDate: "2023-12-27T08:00Z",
      endDate: "2024-01-03T07:59Z",
      seasonType: 2,
      weekNumber: 17,
      year: 2023,
    },
    {
      label: "Week 18",
      startDate: "2024-01-03T08:00Z",
      endDate: "2024-01-13T07:59Z",
      seasonType: 2,
      weekNumber: 18,
      year: 2023,
    },
    {
      label: "Wild Card",
      startDate: "2024-01-13T08:00Z",
      endDate: "2024-01-17T07:59Z",
      seasonType: 3,
      weekNumber: 1,
      year: 2023,
    },
    {
      label: "Div Rd",
      startDate: "2024-01-17T08:00Z",
      endDate: "2024-01-24T07:59Z",
      seasonType: 3,
      weekNumber: 2,
      year: 2023,
    },
    {
      label: "Conf Champ",
      startDate: "2024-01-24T08:00Z",
      endDate: "2024-01-31T07:59Z",
      seasonType: 3,
      weekNumber: 3,
      year: 2023,
    },
    {
      label: "Pro Bowl",
      startDate: "2024-01-31T08:00Z",
      endDate: "2024-02-07T07:59Z",
      seasonType: 3,
      weekNumber: 4,
      year: 2023,
    },
    {
      label: "Super Bowl",
      startDate: "2024-02-07T08:00Z",
      endDate: "2024-02-15T07:59Z",
      seasonType: 3,
      weekNumber: 5,
      year: 2023,
    },
  ];
}
