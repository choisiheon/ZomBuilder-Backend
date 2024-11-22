const express = require('express');
const { getAllTraits } = require('../controllers/traitController.js'); 
const { getTraitsFromVanilla } = require('../controllers/traitController.js'); 
const { getTraitsFromMode } = require('../controllers/traitController.js'); 
const router = express.Router();

// 모든 traits를 가져오는 경로 설정
router.get('/traits', getAllTraits);

// 바닐라모드 traits를 가져오는 경로 설정
router.get('/vTraits', getTraitsFromVanilla);

// 모드의 traits를 가져오는 경로 설정
router.get('/mTraits', getTraitsFromMode);

module.exports = router;

