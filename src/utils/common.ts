import { Dayjs } from "dayjs";

export const formatDate = (isoDateString: string) => {
  const date = new Date(isoDateString);

  // Extract the date components
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  // Return the formatted date string
  return `${year}-${month}-${day}`;
}

export const concatStrings = (text: string, limit: number) => {
  if (text?.length) {
    const truncated = limit && text.length > limit;
    let truncatedStrings = truncated ? text.slice(0, limit) : text;
    if (truncated) {
      truncatedStrings += ", ...";
    }
    return truncatedStrings;
  } else {
    return "—";
  }
}