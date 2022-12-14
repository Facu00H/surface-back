const Shirt = require("../models/Shirt");

const shirtController = {
  create: async (req, res) => {
    try {
      const shirt = await new Shirt(req.body).save(); //req.body tiene que tener todas las variables antes descritas
      res
        .status(201)
        .json({ message: "Shirt created", succsess: true, id: shirt._id });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error.message, success: false });
    }
  },

  readID: async (req, res) => {
    const { id } = req.params;
    try {
      let shirt = await Shirt.findOne({ _id: id });

      if (shirt) {
        res.status(200).json({
          message: "You get one shirt",
          response: shirt,
          success: true,
        });
      } else {
        res.status(404).json({
          message: "Your shirt could not be found",
          success: false,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: "Syntax error or others",
        success: false,
      });
    }
  },

  readAll: async (req, res) => {
    let shirts;
    let query = {};

    if (req.query.price) {
      query.price = req.query.price;
    }

    try {
      if (!query.price) {
        shirts = await Shirt.find();
        res.status(200).json({
          message: "showing all t-shirts",
          response: shirts,
          success: true,
        });
        return;
      } else if (query.price === "upward") {
        shirts = await Shirt.find().sort({ price: 1 });
        res.status(200).json({
          message: "showing t-shirts by upward price",
          response: shirts,
          success: true,
        });
        return;
      } else {
        shirts = await Shirt.find().sort({ price: -1 });
        res.status(200).json({
          message: "showing t-shirts by falling price",
          response: shirts,
          success: true,
        });
        return;
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Error", success: false });
    }
  },
  update: async (req, res) => {
    const { id } = req.params;

    try {
      let ShirtUpdate = await Shirt.findByIdAndUpdate({ _id: id }, req.body);
      if (ShirtUpdate) {
        res.status(200).json({
          message: "you have update a shirt",
          success: true,
        });
      } else {
        res.status(404).json({
          message: "The shirt to update was not found",
          success: false,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: "error",
        success: false,
      });
    }
  },
  deleteShirt: async (req, res) => {
    const { id } = req.params;
    try {
      let shirtDelete = await Shirt.findByIdAndDelete({ _id: id });
      if (shirtDelete) {
        res.status(200).json({
          message: "You have delete a shirt",
          success: true,
        });
      } else {
        res.status(404).json({
          message: "The shirt to delete was not found",
          success: false,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: "error",
        success: false,
      });
    }
  },
};

module.exports = shirtController;
