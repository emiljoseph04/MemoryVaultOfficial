import commonAPI from "./commonAPI";
import BASEURL from "./serviceURL";

// 1. Add Time Capsule
export const addTimeCapsule = async (reqBody) => {
  return await commonAPI("POST", `${BASEURL}/capsules`, reqBody);
};

// 2. Get All Time Capsules
export const getAllTimeCapsules = async () => {
  return await commonAPI("GET", `${BASEURL}/capsules`);
};

// 3. Get Single Time Capsule by ID
export const getTimeCapsuleById = async (id) => {
  return await commonAPI("GET", `${BASEURL}/capsules/${id}`);
};

// 4. Update Time Capsule
export const updateTimeCapsule = async (id, reqBody) => {
  return await commonAPI("PUT", `${BASEURL}/capsules/${id}`, reqBody);
};

// 5. Delete Time Capsule
export const deleteTimeCapsule = async (id) => {
  return await commonAPI("DELETE", `${BASEURL}/capsules/${id}`);
};
