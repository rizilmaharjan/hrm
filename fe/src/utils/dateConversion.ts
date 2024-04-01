export const dateConversion = (date: string) => {
  const formattedDate = new Date(date).toLocaleString();
  return formattedDate;
};
