import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:9999/vue",
  heaers: {
    "Content-type": "application/json",
  },
});
