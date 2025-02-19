import axios from "axios";

export const BASE_URL = "http://localhost:8000/questions";
// export const BASE_URL = "https://trivia-vite-typescript-tailwind-css-eje3.onrender.com/questions";

export const fetchFromAPI = async (url: string) => {
    try {
        const { data } = await axios.get(url);
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error("Network error occurred. Please try again later.");
        } else {
            throw new Error("An error occurred while fetching data.");
        }
    }
};