import React from 'react';
import { Seo } from '../components';
import { graphql } from 'gatsby';
import { Disqus } from 'gatsby-plugin-disqus';
import { useLocation } from '@reach/router';
import { document } from 'browser-monads-ts';
import '../styles/blog.css';

if (document.documentElement.classList.contains('dark')) import('../styles/dark_md.css');
else import('../styles/light_md.css');

export default function Template({
  data
}) {

  const { frontmatter, html } = data.markdownRemark;

  return (
    <div className='blog-post-container'>
      <Seo title={frontmatter.title}/>
      <div className='blog-post'>
        <div className='head'>
          <h1 className='title'>{frontmatter.title}</h1>
          <h2 className='date'>{frontmatter.date}</h2>
          <h3 className='num'>Blog Post #{frontmatter.num}</h3>
          <h4 className='category'>{frontmatter.cat}</h4>
        </div>
        <div
          className='blog-post-content'
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
      <Disqus className='comments' config={{
            url: useLocation().href,
            identifier: frontmatter.num.toString(),
            title: frontmatter.title,
        }}
      />
    </div>
  )
}
export const pageQuery = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        date
        slug
        title
        num
        cat
      }
    }
  }
`
