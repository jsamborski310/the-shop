const router = require("express").Router();
const req = require("express/lib/request");
const res = require("express/lib/response");
const { Tag, Product, ProductTag } = require("../../models");



// GET ALL TAGS ------------//
router.get("/", async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [
        { model: Product }
      ],
    });
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});



// GET SINGLE TAG BY ID ------------//
router.get("/:id", async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [
        { model: Product }
      ],
    });
    if (!tag) {
      res.status(404).json({ message: "No tags found with that id!" });
      return;
    }
    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
});



// CREATE A NEW TAG ------------//
router.post("/", async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});



// UDATE A TAG ------------//
router.put("/:id", async (req, res) => {
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!tagData[0]) {
      res.status(404).json({ message: "No tags with this id!" });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});



// DELETE A TAG ------------//
router.delete("/:id", async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!tagData) {
      res.status(404).json({ message: "No tags with this id!" });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
