const express = require('express');
const { getAllTraits } = require('../controllers/trairController'); 
const router = express.Router();

// 모든 traits를 가져오는 경로 설정
router.get('/traits', getAllTraits);

module.exports = router;
