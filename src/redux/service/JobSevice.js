import httpApi from "./httpApi";

const get = (q = "") => {
    return httpApi.get(`job${q}`);
};

const detail = (id) => {
    return httpApi.get(`positions/${id}`);
};

const JobService = {
    get,
    detail,
};

export default JobService;
