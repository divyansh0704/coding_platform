import jwt from "jsonwebtoken";
// import User from "../models/userModel";

const protect = (req, res, next) => {
    console.log("Middleware hit");
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
         req.user = decoded;
        // const user = await User.findById(decoded.id).select("-password");
        // if (!user) {
        //     return res.status(404).json({ message: "User not found" });
        // }
        // req.user = user;
       
        console.log("✅ Authenticated User:", req.user);
        next();

    } catch (error) {
        res.status(400).json({ message: "Invalid token." });

    }
}

export default protect;