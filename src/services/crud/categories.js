import axios from "axios";
const baseURL = "https://admin.merrix.com/wp-json";
let config = {
  method: "get",
  url: "https://admin.merrix.com/wp-json/wc/v3/products/categories",
  headers: {
    Authorization:
      "Basic Y2tfYzY5YTk2ZTZhN2Q4ZWI1MDZlMWY5MmFiZjZkNzFmODNiYTQ0Y2UyZTpjc182YmI5NDJjMDBhZjIzNzNiNTMwYzNhMWE5YmI2MTU4MzNkMjE5NTNl",
  },
};

class Categories {
  constructor() {
    this.service = axios.create({});
  }
  create() {}

  read(endpoint) {
    return this.service.get(`${baseURL}${endpoint}`, config);
  }

  update() {}

  delete() {}
}

const category = new Categories();
export default category;
