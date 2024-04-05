export const getErrorMessage = (error: any) => {
  if (error.response) {
    const { status } = error.response;
    if (status >= 400 && status < 500) {
      return "There was a problem with your request. Please check the details and try again."; // User-friendly message for client-side errors
    } else {
      return "Something went wrong. Please try again later."; // Generic message for other server-side errors
    }
  } else if (error.request) {
    return "Network error. Please check your connection and try again.";
  } else {
    return "An unexpected error occurred. Please try again later.";
  }
};
