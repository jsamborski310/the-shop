const router = require('express').Router();
const req = require('express/lib/request');
const res = require('express/lib/response');
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findAll({
      include: [
        {model: Product}
      ],
    });
    res.status(200).json(tags);
  } 
    catch (err) {
      res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {

    const tag = await Tag.findByPk(req.params.id, {
      include: [
        {model: Product}
      ],
    })

    if (!tag) {
      res.status(404).json({ message: 'No tags found with that id!' });
      return;
    }

    res.status(200).json(tag);

  }
  // res.json({success:true, hit: "Get Single Product"});
    catch (err) {
      res.status(500).json(err);
  }

});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagData = await Tag.update(req.body, {
      WHERE: {
        id: req.params.id,
      },
    });

      if(!tagData[0]) {
        res.status(404).json({message: 'No tags found with that ID.'});
        return;
      }
      res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
