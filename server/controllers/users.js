import UserSchema from "../models/users_model.js";
import bcryptjs from "bcryptjs";

export const CreateUser = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = UserSchema({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
