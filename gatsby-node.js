const fs = require('fs');
const path = require('path');
const products = require('./src/helpers/product.json');

exports.createPages = async ({ actions }) => {
  const { createPage } = actions;

  // ✅ Product Pages
  const productTemplate = path.resolve('./src/templates/product.js');
  products.forEach((product) => {
    createPage({
      path: `/product/${product.slug}`,
      component: productTemplate,
      context: { slug: product.slug }
    });
  });

  // ✅ Static Pages (home, about)
  const contentDir = './content';
  const pageFiles = fs.readdirSync(contentDir).filter(file => file.endsWith('.json'));

  const pageTemplate = path.resolve('./src/template/page.js');
  pageFiles.forEach((file) => {
    const page = require(path.join(__dirname, contentDir, file));
    const slug = page.slug === 'home' ? '' : page.slug;

    createPage({
      path: `/${slug}`,
      component: pageTemplate,
      context: { slug: page.slug }
    });
  });
};
