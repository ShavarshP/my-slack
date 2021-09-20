import { loadState } from "./localStorage";

const URL = "https://appslack.herokuapp.com/api/is_auth/";

export const validToken = async (request) => {
  try {
    const token = await loadState("auth");

    const newData = await request(URL + token.userId, "get", null, {
      Authorization: `Bearer ${token.token}`,
    });
    return newData ? newData : false;
  } catch (error) {
    return false;
  }
};
