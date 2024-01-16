const Deals = require("../models/Deals");
const Like = require("../models/Like");
const mongoose = require("mongoose");
const { StatusCodes } = require("http-status-codes");

const likeDeal = async (req, res) => {
  const { userId, currentId: dealId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(dealId))
    return res.status(404).send(`No Deal  with id: ${dealId}`);

  const existingLike = await Like.findOne({ userId, dealId });

  if (existingLike) {
    return res
      .status(400)
      .json({ error: "Benutzer hat bereits auf den Beitrag geklickt." });
  }

  const newLike = new Like({ userId, dealId });
  await newLike.save();
  const deal = await Deals.findById(dealId);
  const updatedDeal = await Deals.findByIdAndUpdate(
    dealId,
    { likeCount: deal.likeCount + 1 },
    { new: true }
  );

  res
    .status(StatusCodes.OK)
    .json({ updatedDeal, message: "Like erfolgreich gespeichert." });
};

const getLikedDeals = async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId))
    return res.status(404).send(`Kein Likes für User: ${userId}`);

  const userLikes = await Like.find({ userId }).populate("dealId");

  const likedPosts = userLikes.map((like) => like.dealId);
  res.status(StatusCodes.OK).json(likedPosts);
};
module.exports = {
  likeDeal,
  getLikedDeals,
};
