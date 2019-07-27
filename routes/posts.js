const express = require('express');

const db = require('../data/db');

const router = express.Router();

router.get('/', (req, res) => {
  db.find()
    .then(posts => res.status(200).json(posts))
    .catch(() =>
      res
        .status(500)
        .json({ error: 'The posts information could not be retrieved' })
    );
});

router.post('/', (req, res) => {
  const post = req.body;

  if (!post.title || !post.contents) {
    return res
      .status(400)
      .json({ errorMessage: 'Please provide title and contents for post.' });
  }
  db.insert(post)
    .then(async ({ id }) => res.status(201).json(...(await db.findById(id))))
    .catch(() =>
      res.status(500).json({
        error: 'There was an error while saving the post to the database',
      })
    );
});

router.get('/:id', (req, res) => {
  db.findById(req.params.id)
    .then(post =>
      post.length > 0
        ? res.status(200).json(post[0])
        : res
            .status(404)
            .json({ message: 'The post with the specified ID does not exist.' })
    )
    .catch(() =>
      res
        .status(500)
        .json({ error: 'The post information could not be retrieved.' })
    );
});

router.get('/:id/comments', async (req, res) => {
  const { id } = req.params;
  try {
    const postWasFound = await db.findById(id).then(post => post.length > 0);

    return postWasFound
      ? await db
          .findPostComments(id)
          .then(comments => res.status(200).json(comments))
      : res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist' });
  } catch (err) {
    res
      .status(500)
      .json({ error: 'The comments information could not be retrieved.' });
  }
});

module.exports = router;
