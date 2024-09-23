import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";
export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    //HASH THE PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    //CREATE A NEW USER AND SAVE TO DB
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    console.log(newUser);

    res.status(201).json({ message: "User created Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "falied to create a user" });
  }
};
export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    // check if the user exists
    const user = await prisma.user.findUnique({
      where: { username },
    });
    if (!user) return res.status(401).json({ message: "invalid credentials" });
    // check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      return res.status(401).json({ message: "invalid crendentials" });

    // generate cookie token and send to the user

    //res.setHeader("Set-Cookie", "test=" + "myValue").json("success"); // way to send cookies but to simplify it we use cookie parser as described below

    const age = 1000 * 60 * 60 * 24 * 7;
    const token = jwt.sign(
      {
        id: user.id,
        isAdmin: true,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: age }
    );
    const { password: userPassword, ...userInfo } = user;
    res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: age, // as it expires whenever the session expires so we use it to act as a timer for the cookie to be
        //secure:true    // we cant use it bcoz it is in localhost but use it when in production mode as theree is http then
      })
      .status(200)
      .json(userInfo);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "failed to login" });
  }
};
export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "logout successful" }); // removes the token from the backened
};
