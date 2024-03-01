const { StatusCodes } = require("http-status-codes");
const Deal = require("../models/Deals");
const { NotFoundError, BadRequestError } = require("../errors");
const { default: mongoose } = require("mongoose");
const Like = require("../models/Like");

const getPostsBySearch = async (req, res) => {
  const { searchQuery } = req.query;
  try {
    const titel = new RegExp(searchQuery, "i");
    const deals = await Deal.find({ headline: titel });
    if (!deals) {
      throw new NotFoundError(`Kein Deal Name: ${titel}`);
    }
    res.status(StatusCodes.OK).json({ data: deals, length: deals.length });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};
const getAllDeals = async (req, res) => {
  const deals = await Deal.find().sort("createdAt");
  res.status(StatusCodes.OK).json(deals);
};

const createDeal = async (req, res) => {
  req.body.createdBy = req.user.userId;

  const deal = await Deal.create(req.body);
  res.status(StatusCodes.CREATED).json({ deal });
};

const getUserDeal = async (req, res) => {
  const {
    user: { userId },
  } = req;

  const deal = await Deal.find({ createdBy: userId }).sort("createdAt");
  if (!deal) {
    throw new NotFoundError(`Sie haben Kein Deal mit id: ${userId}`);
  }
  res.status(StatusCodes.OK).json({ deal });
};

const deleteDeal = async (req, res) => {
  const {
    user: { userId },
    params: { id: _id },
  } = req;
  console.log(userId, _id);
  if (!mongoose.Types.ObjectId.isValid(userId)) return res.sendStatus(404);
  const findDeal = await Deal.findOne({ _id, createdBy: userId });
  if (!findDeal) {
    throw new NotFoundError(`Kein Deal mit id: ${_id} gefunden`);
  }
  if (findDeal) {
    await Deal.findByIdAndDelete({
      _id,
    });
    let dealId = _id;
    await Like.findOneAndDelete({ dealId });
  }
  res.status(StatusCodes.OK).json({ _id });
};

const updateDeal = async (req, res) => {
  const {
    body: { headline, preis, link },
    user: { userId },
    params: { id: dealId },
  } = req;
  if (headline === "" || preis === "" || link === "") {
    throw new BadRequestError("titel, preis  or link darf nicht leer sein");
  }
  // const job = Job.findByIdAndUpdate({which job we going to update},what we want update, option: {we get the new updated job, runValidators})
  const deal = await Deal.findByIdAndUpdate(
    { _id: dealId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!deal) {
    throw new NotFoundError(`Kein Deal mit id: ${dealId}`);
  }
  res.status(StatusCodes.OK).json({ deal });
};

module.exports = {
  getPostsBySearch,
  getAllDeals,
  createDeal,
  getUserDeal,
  deleteDeal,
  updateDeal,
};
