const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');



// GET ALL PRODUCTS ------------//
router.get('/', async (req, res) => {

  try {
  const products = await Product.findAll({
    include: [
      {
        model: Category,
        attributes: ['category_name']
      },
      {
        model: Tag, 
        attributes: ['tag_name']
      }
    ],
  });
  res.status(200).json(products);
} 
  catch (err) {
    res.status(500).json(err);
  }

});



// GET A PRODUCT BY ID ------------//
router.get('/:id', async (req, res) => {

  try {

    const product = await Product.findByPk(req.params.id, {
      include: [
        {
          model: Category, 
          attributes: ['category_name']
        },
        {
          model: Tag,
          attributes: ['tag_name']
        }
      ],
    })

    if (!product) {
      res.status(404).json({ message: 'No products found with that id!' });
      return;
    }
    res.json(product);

  }
    catch (err) {
      res.status(500).json(err);
  }
});


// CREATE NEW PRODUCT ------------//
router.post('/', (req, res) => {

    Product.create(req.body)

    // Gets our newly created product.
    .then((product) => {
      // If there are product tags, creates pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // If there are no product tags, responds.
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});




// UPDATE PRODUCT BY ID ------------//
router.put('/:id', (req, res) => {

  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // Gets a list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // Creates filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // Figures out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // Runs both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.delete('/:id', async (req, res) => {
  
  try {
    const product = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!product) {
      res.status(404).json({ message: 'No product with this id!' });
      return;
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }

});

module.exports = router;

