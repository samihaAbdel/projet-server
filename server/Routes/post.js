const {CreatePost, GetAll, GetOne, DeletePost} = require("../Controllers/post.js");
const express= require('express');

const router = express.Router();

router.post('/CreatePost', CreatePost);
router.get('/GetPosts', GetAll);
router.get('/GetOne/:id',GetOne);
router.delete('/Delete/:id',DeletePost);

module.exports = router;