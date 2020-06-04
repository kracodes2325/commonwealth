/* eslint-disable no-unused-expressions */
import chai from 'chai';
import chaiHttp from 'chai-http';
import 'chai/register-should';
import jwt from 'jsonwebtoken';
import app, { resetDatabase } from '../../../server-test';
import { JWT_SECRET } from '../../../server/config';
import * as modelUtils from '../../util/modelUtils';

const ethUtil = require('ethereumjs-util');
chai.use(chaiHttp);
const { expect } = chai;
const markdownThread = require('../../util/fixtures/markdownThread');

describe('Tag Tests', () => {
  const community = 'staking';
  const chain = 'ethereum';
  const title = 'test title';
  const body = 'test body';
  const tagName = 'test tag';
  const tagId = undefined;
  const kind = 'forum';

  before('reset database', async () => {
    await resetDatabase();
  });

  describe('Bulk Tags', () => {
    let adminJWT;
    let adminAddress;

    before(async () => {
      const res = await modelUtils.createAndVerifyAddress({ chain });
      adminAddress = res.address;
      adminJWT = jwt.sign({ id: res.user_id, email: res.email }, JWT_SECRET);
      const isAdmin = await modelUtils.assignRole({
        address_id: res.address_id,
        chainOrCommObj: { offchain_community_id: community },
        role: 'admin',
      });
      expect(adminAddress).to.not.be.null;
      expect(adminJWT).to.not.be.null;
      expect(isAdmin).to.not.be.null;
      const res2 = await modelUtils.createThread({
        chainId: chain,
        communityId: community,
        address: adminAddress,
        jwt: adminJWT,
        title,
        body,
        tagName,
        tagId,
        kind,
      });
      expect(res2.result).to.not.be.null;
    });

    it('Should pass /bulkTags', async () => {
      const res = await chai.request.agent(app)
        .get('/api/bulkTags')
        .set('Accept', 'application/json')
        .query({
          chain,
          jwt: adminJWT,
        });
      expect(res.body.result).to.not.be.null;
      expect(res.body).to.not.be.null;
      expect(res.body.status).to.be.equal('Success');
      expect(res.body.result).to.not.be.null;
      expect(res.body.result.length).to.be.equal(1);
    });
  });

  describe('Update Tags', () => {
    let adminJWT;
    let adminAddress;
    let thread;
    const noTags: string = undefined;
    const oneTag: string = 'tag';

    before(async () => {
      const res = await modelUtils.createAndVerifyAddress({ chain });
      adminAddress = res.address;
      adminJWT = jwt.sign({ id: res.user_id, email: res.email }, JWT_SECRET);
      const isAdmin = await modelUtils.assignRole({
        address_id: res.address_id,
        chainOrCommObj: { offchain_community_id: community },
        role: 'admin',
      });
      expect(adminAddress).to.not.be.null;
      expect(adminJWT).to.not.be.null;
      expect(isAdmin).to.not.be.null;
      const res2 = await modelUtils.createThread({
        chainId: chain,
        communityId: community,
        address: adminAddress,
        jwt: adminJWT,
        title,
        body,
        tagName,
        tagId,
        kind,
      });
      thread = res2.result;
      expect(thread).to.not.be.null;
    });

    it('Should fail to update thread with no tags', async () => {
      const res = await chai.request(app)
        .post('/api/updateTags')
        .set('Accept', 'application/json')
        .send({
          'jwt': adminJWT,
          'thread_id': thread.id,
          'address': adminAddress,
          'tag': noTags,
        });
      expect(res.body).to.not.be.null;
      expect(res.body.status).to.not.be.equal('Success');
      expect(res.body.result).to.not.be.null;
    });

    it('Should successfully add tag to thread', async () => {
      const res = await chai.request(app)
        .post('/api/updateTags')
        .set('Accept', 'application/json')
        .send({
          'jwt': adminJWT,
          'thread_id': thread.id,
          'address': adminAddress,
          'tag': oneTag,
        });
      expect(res.body).to.not.be.null;
      expect(res.body.status).to.be.equal('Success');
      expect(res.body.result).to.not.be.null;
      const tag = res.body.result;
      expect(tag).to.be.equal(oneTag);
    });
  });
});
