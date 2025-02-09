import bcrypt from "bcryptjs" ; 
import jwt from "jsonwebtoken" ; 
import User from "../models/User.js" ;
import cloudinary from "../config/cloudinary.js" ;

export const register = async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, email, password: hashedPassword });
      await newUser.save();
      res.status(201).json({ message: "User registered successfully" }); 
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

export const uploadAvatar = async(req, res) => {
    try {
        const file = req.file.path;
        const result = await cloudinary.uploader.upload(file);
        await User.findByIdAndUpdate(req.user.id, { avatar: result.secure_url });
        res.json({ avatar: result.secure_url });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}; 

export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
      if (!user) return res.status(401).json({ message: "Invalid email or password" });
  
      
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });
  
      
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  
      
      res.status(200).json({
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          avatar: user.avatar,
        },
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };