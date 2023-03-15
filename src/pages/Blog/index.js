import React from 'react';
import { Redirect } from 'react-router-dom';

const Blog = () => {
  return (
    <>
      <Redirect to="blog/blog-posts" />
    </>
  );
};

export default Blog;
