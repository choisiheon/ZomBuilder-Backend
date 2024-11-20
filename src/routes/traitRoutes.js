const express = require('express');
const { getAllTraits, getTraitsByGroup, getTraitsByQuery } = require('../controllers/traitController');
const router = express.Router();

router.get('/', getAllTraits); // 모든 특성
router.get('/:group', getTraitsByQuery); // 그룹별 특성

module.exports = router;
