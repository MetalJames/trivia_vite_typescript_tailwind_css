// api.ts
import axios from "axios";

//export const BASE_URL = "http://localhost:8000/questions";
export const BASE_URL = "https://trivia-vite-typescript-tailwind-css.onrender.com/questions";

export const fetchFromAPI = async (url: string) => {
    try {
        const { data } = await axios.get(url);
        return data;
    } catch (error) {
        // Check if the error is an AxiosError
        if (axios.isAxiosError(error)) {
            // Handle Axios errors (e.g., network error, timeout)
            throw new Error("Network error occurred. Please try again later.");
        } else {
            // Handle other types of errors
            throw new Error("An error occurred while fetching data.");
        }
    }
};