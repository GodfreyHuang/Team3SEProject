import axios from "axios";

axios.defaults.headers.post["Content-Type"] = "application/json";

const mediaApi = {};
export const instance = axios.create({
  onUploadProgress: progressEvent => {
    document.body.style.cursor =
      progressEvent.loaded === progressEvent.total ? "default" : "progress";
  }
});

mediaApi.fire = async options => {
  return instance.request(options);
};

export default mediaApi;
