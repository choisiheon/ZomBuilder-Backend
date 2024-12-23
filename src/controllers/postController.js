const Post = require('../models/postModel.js');
const bcrypt = require('bcrypt');  // bcrypt 모듈 임포트

//새 게시글 생성 로직
const createPost = async (req, res) => {
  try {
    const { job_id, trait_id, comment, password, mode } = req.body;

    if (!job_id || !trait_id || !comment || !password) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required.',
      });
    }

    const result = await Post.createPost(job_id, trait_id, comment, password, mode);
    res.status(201).json({ success: true, message: 'Post created successfully', data: result });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating post',
      error: error.message,
    });
  }
};

//모든 게시글 가져오기 로직
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.getAllPosts();
    res.json({ success: true, data: posts });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching posts',
      error: error.message,
    });
  }
};

// 특정 게시글 가져오기 로직
const getPostById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: '게시글 ID를 입력하세요.',
      });
    }

    const post = await Post.getPostById(id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: '게시글 없음.',
      });
    }

    res.json({ success: true, data: post });
  } catch (error) {
    console.error('Error fetching post by id:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching post by id',
      error: error.message,
    });
  }
};

// 랜덤 게시글 가져오기 로직
const getRandomPost = async (req, res) => {
  try {
    const post = await Post.getRandomPost();
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'No posts available.',
      });
    }

    res.json({ success: true, data: post });
  } catch (error) {
    console.error('Error fetching random post:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching random post',
      error: error.message,
    });
  }
};

//삭제로직
const deletePost = async (req, res) => {
    try {
      const { id } = req.params;  // 'params'로부터 id 받기
      const { password } = req.body;  // 요청 본문에서 비밀번호 받기
  
      console.log("id:", id);  // id 확인
      console.log("pwd:", password); // 비밀번호 확인
  
      if (!id || !password) {
        return res.status(400).json({
          success: false,
          message: 'Post ID and password are required.',
        });
      }
  
      // 게시글 조회
      const post = await Post.getPostById(id);
      if (!post) {
        return res.status(404).json({
          success: false,
          message: 'Post not found.',
        });
      }
  
      // post.password가 존재하는지 확인
      if (!post.password) {
        return res.status(400).json({
          success: false,
          message: 'No password found for this post.',
        });
      }
  
      // 비밀번호 확인
      const isPasswordValid = await bcrypt.compare(password, post.password);
      if (!isPasswordValid) {
        return res.status(403).json({
          success: false,
          message: 'Incorrect password.',
        });
      }
  
      // 비밀번호가 맞으면 게시글 삭제
      const result = await Post.deletePost(id, password);
      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: 'Post not found.',
        });
      }
  
      res.json({ success: true, message: 'Post deleted successfully' });
    } catch (error) {
      console.error('Error deleting post:', error);
      res.status(500).json({
        success: false,
        message: 'Error deleting post',
        error: error.message,
      });
    }
};

module.exports = { createPost, getAllPosts, getPostById, getRandomPost, deletePost };
