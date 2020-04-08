import { Response, NextFunction } from 'express';
import { UserRequest } from '../types';

const editTags = async (models, req: UserRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    return next(new Error('Not logged in'));
  }
  if (!req.body.thread_id) {
    return next(new Error('Must provide thread_id'));
  }
  if (!req.body.community_id && !req.body.chain_id) {
    return next(new Error('Must provide community_id or chain_id'));
  }
  if (!req.body.tags) {
    return next(new Error('Must provide tags: string[]'));
  }

  const { thread_id, community_id, chain_id, tags } = req.body;

  const thread = await models.OffchainThread.findOne({
    where: {
      thread_id,
    },
  });

  try {
    const activeTags = await models.OffchainTag.findAll({
      where: {
        thread_id,
      },
    });
    // remove deleted tags
    const oldTags = activeTags.filter((activeTag) => {
      return !tags.includes(activeTag.name); // not included in tags
    });
    await oldTags.map(async (tag) => {
      await thread.removeTag(tag);
    });
    // create new tags
    const newTags = tags.filter((tag) => {
      return activeTags.map((a) => a.name).indexOf(tag) === -1;
    });

    await newTags.map(async (tag) => {
      const newTag = await models.OffchainTag.create({
        thread_id,
        name: tag,
        community_id,
        chain_id,
      });
      thread.addTag(newTag);
    });

    await thread.update(); // gets updated model associations?

    return res.json({ status: 'Success', result: thread.toJSON() });
  } catch (e) {
    return next(e);
  }
};

export default editTags;
