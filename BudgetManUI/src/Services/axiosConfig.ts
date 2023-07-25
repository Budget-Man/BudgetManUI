import axios from "axios";
// const baseAPIUrl = "localhost:333/api/";
export const baseUrlService = axios.create({
    baseURL: "https://localhost:7053/api/",
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
  });