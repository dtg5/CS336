import React from 'react';
import ReactDOM from 'react-dom';

import CommentBox from './commentbox';

import '../css/base.css';

// REACT RENDER
ReactDOM.render(
  <CommentBox url="/api/comments" pollInterval={2000} />,
  document.getElementById('content')
);