exports.createPages = async ({ actions }) => {
  const { createPage } = actions;
  const productTemplate = require.resolve('./src/templates/product.js');

  const products = require('./src/helpers/product.json');

  products.forEach((product) => {
    const slug = product.name.toLowerCase().replace(/\s+/g, '-');
    createPage({
      path: `/product/${slug}`,
      component: productTemplate,
      context: {
        slug,
      },
    });
  });
};
