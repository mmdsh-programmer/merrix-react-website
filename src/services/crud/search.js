import axios from "axios";
const baseURL = "https://admin.merrix.com/wp-json";
let config = {
  method: "get",
  url: "https://admin.merrix.com/wp-json/wc/v3/products",
  headers: {
    Authorization:
      "Basic Y2tfYzY5YTk2ZTZhN2Q4ZWI1MDZlMWY5MmFiZjZkNzFmODNiYTQ0Y2UyZTpjc182YmI5NDJjMDBhZjIzNzNiNTMwYzNhMWE5YmI2MTU4MzNkMjE5NTNl",
  },
};

class Search {
  constructor() {
    this.service = axios.create({});
  }
  read(endpoint) {
    return this.service.get(`${baseURL}${endpoint}`, config);
  }
}

const searchresult = new Search();
export default searchresult;
