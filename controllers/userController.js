import UserSchema from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { createToken, verifyToken } from "../utils/token.js";

// Sign up function
export const signup = async (req, res) => {
  let { name, email,role, photourl, phone } = req.body;
  phone=Number(phone)
  const generatedPassword = "random";
  const password = req.body.password || generatedPassword;
  // const picture = req.file.filename;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  try {
    const newUser = new UserSchema({
      name,
      email,
      phone,
      role,
      password: hash,
      role,
      // picture: picture,
      photourl,
    });
    await newUser.save();
    const token = createToken(newUser);
    const decoded = verifyToken(token);
    res
      .status(200)
      .cookie("userToken", token, {
        secure: true,
        httpOnly: true,
        sameSite: "None",
      })
      .json({ message: "user created successfully", token: decoded });
  } catch (err) {
    console.log(err);
    res.status(401).send("Something went wrong !");
  }
};
//Google Auth
export const gsignup = async (req, res) => {
  const { name, email, role, photourl, phone } = req.body;
  const generatedPassword = "random";
  const password = req.body.password || generatedPassword;
  const picture = req.file;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  try {
    // handles an already authenticated account
    const user = await UserSchema.findOne({ email: email });
    if (user) {
      const token = createToken(user);
      const decoded = verifyToken(token);
      res
        .cookie("userToken", token, {
          secure: true,
          httpOnly: true,
          sameSite: "None",
        })
        .status(200)
        .json({ message: "user logged in successfully", token: decoded });
      //
    } else {
      const newUser = new UserSchema({
        name,
        email,
        password: hash,
        role,
        picture: picture,
        photourl,
        phone,
      });
      await newUser.save();
      const token = createToken(newUser);
      const decoded = verifyToken(token);
      res
        .status(200)
        .cookie("userToken", token, {
          secure: true,
          httpOnly: true,
          sameSite: "None",
        })
        .json({ message: "user created successfully", token: decoded });
    }
  } catch (err) {
    console.log(err);
    res.status(401).send("Something went wrong !");
  }
};

// Log in function
export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserSchema.findOne({ email:email });
  if (!user) {
    return res.status(401).send("user not found !" );
  } else {
    try {
      if (await bcrypt.compare(password, user.password)) {
        const token = createToken(user);
        const decoded = verifyToken(token);
        res
          .cookie("userToken", token, {
            secure: true,
            httpOnly: true,
            sameSite: "None",
          })
          .status(200)
          .json({ message: "user logged in successfully", token: decoded });
      }
    } catch (error) {
      console.log(err);
    }
  }
};




//logout fct

export const logout = (req, res) => {
  console.log("cookie cleared");
  return res
    .clearCookie("userToken")
    .status(200)
    .send("successfully logged out");
};

// Fetch all users
export const getAll = async (req, res) => {
  try {
    const allUsers = await UserSchema.find();
    return res.status(200).json(allUsers);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "cannot fetch users" });
  }
};

// Fetch one user by ID
export const getOne = async (req, res) => {
  const token = req.cookies.userToken;
  const decoded = verifyToken(token);
  const id = decoded.data ? decoded.data.id : undefined;
  try {
    if (!id) {
      return res.status(400).json({ error: "NO Token!!!!!!!" });
    }
    const user = await UserSchema.findById(id);
    if (user) {
      return res.json({
        Picture: user.picture,
        Role: user.role,
        id: user._id,
        name: user.name,
        photourl: user.photourl,
        phone: user.phone,
      });
    } else {
      return res.status(404).json({ error: "User Not Found!" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Couldn't find user" });
  }
};

// Update user

// export const updateUser = async (req, res) => {
//   const id = req.params.id;
//   console.log(req.body);
//   console.log("Hi I am here");
//   try {
//     const { name, email, password, phone, role } = req.body;
//     console.log("HIII BODY", req.body);
//     const salt = bcrypt.genSaltSync(10);
//     const hash = bcrypt.hashSync(password, salt);

//     await UserSchema.findByIdAndUpdate(
//       { _id: id },

//       {
//         name: name,
//         email: email,
//         password: hash,
//         phone: phone,
//         role: role,
//       }
//     );

//     console.log("Hi I am updated");

//     return res.status(200).json({ message: "user updated successfully" });
//   } catch (err) {
//     console.log("errbacj", err);
//     res.status(500).json({ error: "Trouble updating user info" });
//   }
// };

// update the user
export const updateUser = async (req, res) => {
  const id = req.params.id;
  console.log("Updating user with ID:", id);

  try {
    const { name, email, phone, role } = req.body;

    await UserSchema.findByIdAndUpdate(
      { _id: id },
      {
        name: name,
        // email: email,
        phone: phone,
        role: role,
      }
    );

    console.log("User updated successfully");

    return res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    console.error("Error updating user:", err);
    return res.status(500).json({ error: "Trouble updating user info" });
  }
};


// Delete user

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    await UserSchema.deleteOne({ _id: id });
    res.status(200).json({ message: "user deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: " could not delete user" });
  }
};
