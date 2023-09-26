import axios from "axios";

export async function fetchITAdmins() {
  try {
    const response = await axios.get("https://salicapi.com/api/user/itadmins");
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}
