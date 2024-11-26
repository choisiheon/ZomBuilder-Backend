const pool = require('../config/db');
const bcrypt = require('bcrypt');

const Post = {
  // 게시글 생성
  createPost: async (job_id, trait_id, comment, password, mode) => {
    try {
      const hashedPassword = await bcrypt.hash(password, 10); // 비밀번호 해싱
      const query = `
        INSERT INTO posts (job_id, trait_id, comment, password, modecheck, created_at)
        VALUES (?, ?, ?, ?, ?, NOW())
      `;
      const [result] = await pool.query(query, [job_id, trait_id, comment, hashedPassword, mode]);
      return result;
    } 
    catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  },

  // 모든 게시글 조회
  getAllPosts: async () => {
    try {
      const query = 'SELECT * FROM posts';
      const [rows] = await pool.query(query);
      return rows;
    } 
    catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  },

  // 특정 게시글 조회 (id로)
  getPostById: async (id) => {
      try {
          const query = 'SELECT * FROM posts WHERE id = ?';
          const [rows] = await pool.query(query, [id]);
          if (rows.length === 0) {
              return null;  // 게시글이 없으면 null 반환
            }
          return rows[0]; // 게시글이 존재하면 첫 번째 결과를 반환
      } catch (error) {
          console.error('Error fetching post by id:', error);
          throw error;
      }
  },

  // 랜덤 게시글 조회
  getRandomPost: async () => {
    try {
      const query = 'SELECT * FROM posts ORDER BY RAND() LIMIT 1';
      const [rows] = await pool.query(query);
      if (rows.length === 0) {
        return null; // 게시글이 없으면 null 반환
      }
      return rows[0]; // 첫 번째 게시글 반환
    } catch (error) {
      console.error('Error fetching random post:', error);
      throw error;
    }
  },

  // 게시글 삭제
  deletePost: async (id, password) => {
    try {
      // 게시글 조회
      const post = await Post.getPostById(id);
      if (!post) {
        throw new Error('Post not found');
      }

      // post.password가 존재하는지 확인
      if (!post.password) {
        throw new Error('Password not found for the post');
      }

      // 비밀번호 확인
      const isPasswordValid = await bcrypt.compare(password, post.password);
      if (!isPasswordValid) {
        throw new Error('Incorrect password');
      }

      // 비밀번호가 맞으면 게시글 삭제
      const query = 'DELETE FROM posts WHERE id = ?';
      const [result] = await pool.query(query, [id]);
      return result;
    } 
    catch (error) {
      console.error('Error deleting post:', error);
      throw error;
    }
  },
};

module.exports = Post;
