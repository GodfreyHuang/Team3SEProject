import api from "../mediaApi";
import { apihost } from "../../configConst";

const MediaApi = {};

MediaApi.uploadImage = file => {
  const url = `${
    apihost[process.env.REACT_APP_ENV]
    }/media/image?sessionId=${localStorage.getItem("sessionId")}`;
  const formData = new FormData();
  formData.append("file", file);
  return api.fire({
    url,
    method: "POST",
    data: formData
  });
};

export default MediaApi;
