import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
    console.log("getUsersForSidebar");

    try {
        const loggedInUserId = req.user._id;
        // ne means user list not equal this user
        const filterUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

        res.status(200).json(filterUsers);
    } catch (error) {
        console.log("error in controller", error.message);
        res.status(500).json({ error: "internal server error" });
    }
}