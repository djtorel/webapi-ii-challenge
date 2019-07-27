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

module.exports = router;
