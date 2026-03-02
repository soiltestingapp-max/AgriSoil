import User from "../models/User.js";
import SoilReport from "../models/SoilReport.js";

/* ============================= */
/* ADMIN: Get All Users */
/* ============================= */
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    const usersWithReports = await Promise.all(
      users.map(async (user) => {
        const reportCount = await SoilReport.countDocuments({
          user: user._id,
        });

        return {
          ...user._doc,
          reportCount,
        };
      })
    );

    res.json(usersWithReports);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

/* ============================= */
/* ADMIN: Update Role */
/* ============================= */
export const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.role = role;
    await user.save();

    res.json({ message: "Role updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update role" });
  }
};

/* ============================= */
/* ADMIN: Delete User */
/* ============================= */
export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete user" });
  }
};