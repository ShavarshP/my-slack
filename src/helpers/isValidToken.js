import { loadState } from "./localStorage";

export const validToken = async (request) => {
  try {
    const token = await loadState("auth");

    const newData = await request(
      "https://appslack.herokuapp.com/api/is_auth/" + token.userId,
      "get",
      null,
      {
        Authorization: `Bearer ${token.token}`,
      }
    );
    return newData ? newData : false;
  } catch (error) {
    return false;
  }
};
