import MediaAPI from "./api/apifetcher/media";

export const toLocalTime = timestamp => {
  const createAt = new Date(timestamp);
  return createAt.toLocaleString();
};

export const handleUploadImage = file => {
  return MediaAPI.uploadImage(file).then(res => res.data);
};
