/* eslint-disable no-unused-expressions */
import 'pages/tags.scss';

import _ from 'lodash';
import m from 'mithril';
import $ from 'jquery';
import { Card } from 'construct-ui';

import app from 'state';
import TagSelector from 'views/components/navigation/tag_selector';

const TagsPage = {
  view: (vnode) => {
    return m('.TagsPage', [
      m(TagSelector, { activeTag: null, showFullListing: true }),
    ]);
  },
};

export default TagsPage;