export class DateFormat {
  static addDays(date: Date, days: number): Date {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + days);

    return newDate;
  }

  static isExpired(date: Date, date2 = new Date()): boolean {
    return date < date2;
  }
}