import express from "express";
import User from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";


const router = express.Router();


//Register -------------------------------------------------------------

router.post("/register", async (req, res) => {
  //
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({
      success: false,
      message: "User already exists with this email",
    });
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  const token = generateToken(user._id);

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    },
  });
});

// Login --------------------------------------------------------

import { protect } from "../middleware/authMiddleware.js";

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');

  // 3. Check if the user exists AND if the password is correct
  if (user && (await user.matchPassword(password))) {
    // 4. Generate a token
    const token = generateToken(user._id);

    // 5. Send a successful response with the token and user details
    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
    });
  } else {
    // 6. Handle failure (user not found or incorrect password)
    res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }
});

router.get("/me", protect, async (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      user: req.user,
    },
  });
});

export default router;