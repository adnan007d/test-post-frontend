import axios from "../axios";
import { IUser } from "../slices/userSlice";

const createUser = async (user: IUser) => {
  const response = await axios.post("/user/create_user", user);
  return response;
};

export { createUser };
