const NewsLetter = require("../models/NewsLetterModel");

const createNewsLetter = async (req, res) => {
  const { email } = req.body;
  const info = {
    email: req.body.email,
  };
  try {
    const user = await NewsLetter.findOne({ where: { email: email } });

    if (!user) {
      res.status(400).json({error: "user not found"});
    } else {
      const news = await NewsLetter.create(info);
      res.status(200).json({
          news,
          success: true,
          message: "created"
      });
    }

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getNewsLetter = async (req, res) => {
  try {
    const allSubscribers = await NewsLetter.findAll({});
    res.status(200).json(allSubscribers);
  } catch (error) {
    res.status(400);
  }
};

const deleteNewsletter = async (req, res) => {
  const { id } = req.params;
  const newsLetter = await NewsLetter.destroy({
    where: {
      id: id,
    },
  });
  if (!newsLetter) {
    return res.status(400).json({ error: "Details doesn't exist " });
  }
  res.status(200).json(newsLetter);
};
module.exports = {
  createNewsLetter,
  getNewsLetter,
  deleteNewsletter,
};
