import { API_ERROR, CAT_DATA_API } from "./constant.js";

const request = async (nodeId) => {
  try {
    const res = await fetch(`${CAT_DATA_API}/${nodeId ? nodeId : ""}`);
    if (!res.ok) {
      throw new Error(API_ERROR);
    }
    return await res.json();
  } catch (e) {
    throw new Error([API_ERROR, e.message]);
  }
};
export default request;
