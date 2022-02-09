// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// --One to many for the first two. Always need to define to both sides. How one relates to another, and how that one relates back. 

// Products (A) belongsTo Category (B)
Product.belongsTo(Category);

// Categories have many Products
Category.hasMany(Product);

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {through: ProductTag});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {through: ProductTag});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
