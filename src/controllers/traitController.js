const Trait = require('../models/Trait');

const getAllTraits = async (req, res) => {
  try {
    const traits = await Trait.getAll();
    res.json({ success: true, data: traits });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching traits', error });
  }
};

// 모드와 긍정부정을 쿼리로 나눠서 Traits 가져오기
const getTraitsByQuery = async (req, res) => {
    const { mode, group } = req.query; // 쿼리에서 mode와 group 가져오기
    try {
      // mode와 group이 모두 존재해야만 처리
      if (!mode || !group) {
        return res.status(400).json({
          success: false,
          message: 'Both "mode" and "group" parameters are required.',
        });
      }
  
      const traits = await Trait.getByGroup(mode, group);
      res.json({ success: true, data: traits });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching traits by query',
        error,
      });
    }
  };


module.exports = { getAllTraits, getTraitsByQuery };
