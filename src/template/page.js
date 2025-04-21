import React from 'react';
import Layout from '../components/Layout/Layout';
import content from '../../content'; // Or load dynamically via GraphQL or fs

const PageTemplate = ({ pageContext }) => {
  const { slug } = pageContext;
  const page = content.find(p => p.slug === slug) || {};

  return (
    <Layout>
      <h1>{page.title}</h1>
      {page.heroText && <p>{page.heroText}</p>}
      {page.body && <p>{page.body}</p>}
      {page.ctaText && <button>{page.ctaText}</button>}
    </Layout>
  );
};

export default PageTemplate;
