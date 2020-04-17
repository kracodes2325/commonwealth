/* eslint-disable no-unused-expressions */
import 'pages/members.scss';

import _ from 'lodash';
import m from 'mithril';
import $ from 'jquery';

import app from 'state';
import ListingPage from 'views/pages/_listing_page';
import ChainOrCommunityRoles from 'views/pages/discussions/roles';

const MembersPage = {
  view: (vnode) => {
    return m(ListingPage, {
      class: 'MembersPage',
      title: 'Members',
      content: m('.row', [
        m(ChainOrCommunityRoles),
      ]),
    });
  },
};

export default MembersPage;