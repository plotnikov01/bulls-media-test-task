import UserModel from "../models/User.js";

export const register = async (req, res) => {
  try {
    const newUser = new UserModel({
      email: req.body.email,
      password: req.body.password,
    });

    const user = await newUser.save();

    const { password: _, ...userData } = user._doc;

    res.status(201).json(userData);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to register",
    });
  }
};

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({
      id: user._id,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to login",
    });
  }
};

export const getUserCredentialsById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const { email, password } = user;

    res.json({
      email,
      password,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to retrieve user credentials",
    });
  }
};

export const updateUserCredentials = async (req, res) => {
  try {
    const userId = req.params.id;
    const { email, password } = req.body;

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { email, password },
      { new: true },
    );

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({
      message: "User credentials updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to update user credentials",
    });
  }
};
