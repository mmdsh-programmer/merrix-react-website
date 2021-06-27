import axios from "axios";
const baseURL = "https://merrix.com/wp-json";
let config = {
    method: "get",
    url: "https://merrix.com/wp-json/wc/v3/products/categories",
    headers: {
      Authorization:
        "Basic Y2tfY2JhYmE5Mzk2YTliNWUxMTE2OTcwZmRjOTgxMjc2YWZlNWQ0MjQ1NDpjc183NTcxZDYzMjFlNTMxZTM4NWQwOWZkOTg4ZTUzMDkzNDlhNWE4OTNk",
    },
  };

class Categories {
    constructor() {
        this.service = axios.create({});
    }
    create() {

    }

    read() {
        return this.service.get(`${baseURL}/wc/v3/products/categories?parent=0&per_page=100`, config);
    }

    update() {

    }

    delete() {

    }

}

const category = new Categories();
export default category;