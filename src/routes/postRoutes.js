const express = require('express');
const { createPost, getAllPosts, deletePost, getPostById, getRandomPost } = require('../controllers/postController');
const router = express.Router();

// 게시글 생성 create
router.post('/cPosts', createPost);

// 모든 게시글 조회 read
router.get('/rPosts', getAllPosts);

// 랜덤 게시글 조회
router.get('/rPosts/random', getRandomPost);

// 특정 게시글 조회 read by id
router.get('/rPosts/:id', getPostById);

// 게시글 삭제 delete
router.delete('/dPosts/:id', deletePost);

// posts 테이블에서 id값을 파라미터로 주면 게시글을 반환하는 GET MAPPING


module.exports = router;
