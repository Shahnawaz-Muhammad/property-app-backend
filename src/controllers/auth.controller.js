import User from "../models/userModel.js";

const getAllUsers = async (req, res) => {};

// Create New User
const registerController = async (req, res, next) => {
  const { username, email, password } = req.body;
  //validate
  try {
    if (!username) {
      return next("name is required");
    }
    if (!email) {
      return next("email is required");
    }
    if (!password) {
      return next("password is required and greater than 6 character");
    }
    const exisitingUser = await User.findOne({ email });
    if (exisitingUser) {
      return next("Email Already Register Please Login");
    }
    const user = await User.create({ username, email, password });
    //token
    const token = user.createJWT();
    res.status(201).send({
      sucess: true,
      message: "User Created Successfully",
      user: {
        username: user.username,
        email: user.email,
        // password: user.password,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return next({ message: "Please provide all fields", statusCode: 400 });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next({ message: "Invalid email or password", statusCode: 400 });
    }
    //compare password
    const isMatch = await user.comparePassword(password);
    if (isMatch) {
      return next({ message: "Invalid email or password", statusCode: 400 });
    }
    user.password = undefined;
    const token = user.createJWT();
    res.status(200).json({
      success: true,
      message: "Login successful",
      user: user.email,
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export { registerController, loginUser };
