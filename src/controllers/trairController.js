const Trait = require('../models/traitModel.js'); // 모델을 가져오는 예시

const getAllTraits = async (req, res) => {
  try {
    const traits = await Trait.getAll(); // 모델에서 traits를 가져옵니다.
    res.json({ success: true, data: traits });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching traits', error });
  }
};

module.exports = { getAllTraits };
