import Address from "../models/address.js";

const addAddress = async (req, res) => {
  const address = await Address.create(req.body);
  res.status(201).json(address);
};

export default { addAddress };
