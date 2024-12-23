const express = require('express');
const { getAllTraits, getTraitsFromVanilla, getTraitsFromMode, getJobs } = require('../controllers/traitController.js'); 
const router = express.Router();

// 모든 traits를 가져오는 경로 설정
router.get('/traits', getAllTraits);

// 바닐라모드 traits를 가져오는 경로 설정
router.get('/vTraits', getTraitsFromVanilla);

// 모드의 traits를 가져오는 경로 설정
router.get('/mTraits', getTraitsFromMode);

// 직업을 불러오는 경로 설정
router.get('/jobs', getJobs);

module.exports = router;

