import axios from "axios";
const baseURL = "https://admin.merrix.com/wp-json";
let config = {
  method: "post",
  url: "https://admin.merrix.com/wp-json/wc/v3/orders",
  headers: {
    Authorization:
      "Basic Y2tfYzY5YTk2ZTZhN2Q4ZWI1MDZlMWY5MmFiZjZkNzFmODNiYTQ0Y2UyZTpjc182YmI5NDJjMDBhZjIzNzNiNTMwYzNhMWE5YmI2MTU4MzNkMjE5NTNl",
  },
};

class Orders {
  constructor() {
    this.service = axios.create({});
  }
  create(data, endpoint) {
    return this.service.post(`${baseURL}${endpoint}`, data, config);
  }
}

const order = new Orders();
export default order;
