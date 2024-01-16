const { StatusCodes } = require("http-status-codes");
const Deal = require("../models/Deals");
const { NotFoundError, BadRequestError } = require("../errors");
const mongoose = require("mongoose");
const Like = require("../models/Like");

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
    throw new NotFoundError(`Kein Deal mit id: ${dealId}`);
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
    throw new NotFoundError(`Kein Deal mit id: ${dealId}`);
  }
  res.status(StatusCodes.OK).send();
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
  getAllDeals,
  createDeal,
  getDeal,
  deleteDeal,
  updateDeal,
};
