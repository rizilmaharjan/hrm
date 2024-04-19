export const dateConversion = (date: string) => {
  const formattedDate = new Date(date).toISOString().split("T")[0];
  return formattedDate;
};
