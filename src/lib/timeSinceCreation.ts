export function timeSinceCreation(dateCreation: Date): string {
  const currentDate = new Date();
  const postDate = new Date(dateCreation);

  const timeDifference = currentDate.getTime() - postDate.getTime();

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years > 0) {
    return `${years} year(s)`;
  } else if (months > 0) {
    return `${months} month(s)`;
  } else if (days > 0) {
    return `${days} day(s)`;
  } else if (hours > 0) {
    return `${hours} hour(s)`;
  } else if (minutes > 0) {
    return `${minutes} minute(s)`;
  } else {
    return `${seconds} second(s)`;
  }
}
