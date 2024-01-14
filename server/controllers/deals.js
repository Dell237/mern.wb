const { StatusCodes } = require("http-status-codes");
const Deal = require("../models/Deals");
const { NotFoundError, BadRequestError } = require("../errors");
const mongoose = require("mongoose");

const getAllDeals = async (req, res) => {
  const deals = await Deal.find().sort("createdAt");
  res.status(StatusCodes.OK).json(deals);
};

const createDeal = async (req, res) => {
  req.body.createdBy = req.user.userId;

  const deal = await Deal.create(req.body);
  res.status(StatusCodes.CREATED).json({ deal });
};

const getDeal = async (req, res) => {
  const {
    user: { userId },
    params: { id: dealId },
  } = req;
  const deal = await Deal.findOne({ _id: dealId, createdBy: userId });
  if (!deal) {
    throw new NotFoundError(`No job with id ${dealId}`);
  }
  res.status(StatusCodes.OK).json({ deal });
};

const deleteDeal = async (req, res) => {
  const {
    user: { userId },
    params: { id: dealId },
  } = req;
  const deal = await Deal.findByIdAndDelete({
    _id: dealId,
    createdBy: userId,
  });
  if (!deal) {
    throw new NotFoundError(`No job with id ${dealId}`);
  }
  res.status(StatusCodes.OK).send();
};

const updateDeal = async (req, res) => {
  const {
    body: { headline, preis },
    user: { userId },
    params: { id: dealId },
  } = req;
  if (headline === "" || preis === "") {
    throw new BadRequestError("Company or Position can not be empty");
  }
  // const job = Job.findByIdAndUpdate({which job we going to update},what we want update, option: {we get the new updated job, runValidators})
  const deal = await Deal.findByIdAndUpdate(
    { _id: dealId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!deal) {
    throw new NotFoundError(`No job with id ${dealId}`);
  }
  res.status(StatusCodes.OK).json({ deal });
};

const likeDeal = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send(`No post with id: ${_id}`);

  const deal = await Deal.findById(_id);
  const updatedDeal = await Deal.findByIdAndUpdate(
    _id,
    { likeCount: deal.likeCount + 1 },
    { new: true }
  );
  res.json(updatedDeal);
};

module.exports = {
  getAllDeals,
  createDeal,
  getDeal,
  deleteDeal,
  updateDeal,
  likeDeal,
};
