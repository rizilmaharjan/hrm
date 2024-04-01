type TEvent = {
  [key: string]: string;
  P: string;
  N: string;
  T: string;
  A: string;
};
export const mapServiceEventType = (eventType: string): string => {
  const eventMap: TEvent = {
    P: "Promotion",
    N: "Normal",
    T: "Transfer",
    A: "Appoinment",
  };

  return eventMap[eventType];
};
