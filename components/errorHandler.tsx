import { toast } from "react-toastify";

export const handleError = (error: any) => {
  if (error.response && error.response.data && error.response.data.error) {
    const errorMessage = error.response.data.error.message;
    toast.error(errorMessage);
  } else {
    toast.error("An unexpected error occurred.");
  }
};
