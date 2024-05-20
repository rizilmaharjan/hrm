export const hrUsernames = [
  "UPEN",
  "BP",
  "KAMAL",
  "SAROJ",
  "MOHAN",
  "AMIT",
  "DINESH",
  "DHANESHWAR",
  "KAMALR",
  "HR",
  "RAKESH",
  "JITENDRA",
  "BANDANA",
  "SANJAYA",
  "8473",
];

export const isHRUsername = (username: string): boolean => {
  // Check if the provided username is in the list of HR usernames
  return hrUsernames.includes(username.toUpperCase()); // Convert to uppercase to ensure case-insensitive comparison
};
