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

module.exports = router;
