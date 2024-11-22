const express = require('express');
const { createPost, getAllPosts, deletePost } = require('../controllers/postController');
const router = express.Router();

// 게시글 생성 create
router.post('/cPosts', createPost);

// 모든 게시글 조회 read
router.get('/rPosts', getAllPosts);

// 게시글 삭제 delete
router.delete('/dPosts/:id', deletePost);

module.exports = router;
