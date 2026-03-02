import SoilReport from "../models/SoilReport.js";
import User from "../models/User.js";
import Order from "../models/order.js";

export const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalReports = await SoilReport.countDocuments();
    const pendingReports = await SoilReport.countDocuments({
      approvedByAdmin: false,
    });
    const totalOrders = await Order.countDocuments();

    res.json({
      totalUsers,
      totalReports,
      pendingReports,
      totalOrders,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const approveReport = async (req, res) => {
  try {
    const report = await SoilReport.findById(req.params.id);
    report.approvedByAdmin = true;
    await report.save();

    res.json({ message: "Report approved" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
