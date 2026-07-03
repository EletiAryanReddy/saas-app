import cron from "node-cron";
import Calendar from "./calendar.model";

export const startCalendarScheduler = () => {
console.log("📅 Calendar Scheduler Started");

cron.schedule("*/5 * * * *", async () => {
try {
const now = new Date();

  const events = await Calendar.find({
    recurrence: { $ne: "NONE" }
  });

  for (const event of events) {
    const start = new Date(event.startTime);

    let nextDate: Date | null = null;

    switch (event.recurrence) {
      case "DAILY":
        nextDate = new Date(
          start.getTime() +
            24 * 60 * 60 * 1000
        );
        break;

      case "WEEKLY":
        nextDate = new Date(
          start.getTime() +
            7 * 24 * 60 * 60 * 1000
        );
        break;

      case "MONTHLY":
        nextDate = new Date(start);
        nextDate.setMonth(
          nextDate.getMonth() + 1
        );
        break;

      case "YEARLY":
        nextDate = new Date(start);
        nextDate.setFullYear(
          nextDate.getFullYear() + 1
        );
        break;
    }

    if (nextDate && nextDate < now) {
      const duration =
        new Date(event.endTime).getTime() -
        new Date(event.startTime).getTime();

      await Calendar.create({
        workspaceId: event.workspaceId,
        title: event.title,
        description: event.description,
        startTime: nextDate,
        endTime: new Date(
          nextDate.getTime() + duration
        ),
        participants: event.participants,
        recurrence: event.recurrence,
        reminder: event.reminder,
        color: event.color,
        createdBy: event.createdBy
      });

      console.log(
        "♻ Recurring Event Generated:",
        event.title
      );
    }
  }
} catch (error) {
  console.error(
    "Calendar Scheduler Error:",
    error
  );
}
});
};
