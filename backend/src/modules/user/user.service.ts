import User from "./user.model";

export const getUserById = async (id: string) => {
  return User.findById(id).select(
    "-password -refreshToken -otp"
  );
};

export const getUserByEmail = async (email: string) => {
  return User.findOne({ email });
};

export const getUserByPhone = async (phone: string) => {
  return User.findOne({ phone });
};

export const updateUser = async (
  id: string,
  data: any
) => {
  return User.findByIdAndUpdate(
    id,
    data,
    { returnDocument: "after" }
  );
};