
import React from 'react';
import ReactDOM from 'react-dom';

import '../css/base.css';
import CommentBox from './commentbox';

ReactDOM.render(
  <CommentBox url="/api/comments" pollInterval={2000} />,
  document.getElementById('content')
);
