import { AxiosError } from "axios";
import { toast } from "react-hot-toast";

export function handleApiError(error: unknown, defaultMessage = "Something went wrong") {
    const err = error as AxiosError<{ message?: string }>;
    const errorMessage = err?.response?.data?.message || err?.message || defaultMessage;

    toast.error(errorMessage);
    throw err;
}
