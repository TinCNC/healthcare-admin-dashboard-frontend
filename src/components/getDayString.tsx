export const getDayStringShort = (day: number) => {
  switch (day) {
    case 0:
      return "Mon";
    case 1:
      return "Tue";
    case 2:
      return "Wed";
    case 3:
      return "Thu";
    case 4:
      return "Fri";
    case 5:
      return "Sat";
    case 6:
      return "Sun";
    default:
      return "Invalid Date";
  }
};

export const getDayStringLong = (day: number) => {
  switch (day) {
    case 0:
      return "Monday";
    case 1:
      return "Tueday";
    case 2:
      return "Wednesday";
    case 3:
      return "Thursday";
    case 4:
      return "Friday";
    case 5:
      return "Saturday";
    case 6:
      return "Sunday";
    default:
      return "Invalid Date";
  }
};
