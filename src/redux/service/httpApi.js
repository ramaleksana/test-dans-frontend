import axios from "axios";

const BASE_API = "http://localhost:8080/";

export const httpPublic = axios.create({
    baseURL: BASE_API,
    headers: {
        "Content-type": "application/json",
    },
});

export default axios.create({
    baseURL: BASE_API,
    headers: {
        "Content-type": "application/json",
        // Authorization: `Bearer ${token}`,
    },
});
