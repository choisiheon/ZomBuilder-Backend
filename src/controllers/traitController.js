const Trait = require('../models/traitModel.js');

const getAllTraits = async (req, res) => {
  try {
    const traits = await Trait.getAll();
    res.json({ success: true, data: traits });
  } catch (error) {
    console.error('Error fetching traits:', error); // 로그에 에러 출력
    res.status(500).json({ success: false, message: 'Error fetching traits', error: error.message });
  }
};

const getTraitsFromVanilla = async (req, res) => {
  try {
    const { group } = req.query;

    console.log("Received group value:", group);

    if (!group) {
      return res.status(400).json({
        success: false,
        message: "Group parameter is required",
      });
    }

    const mappedGroup =
      group === 'positive' ? '긍정' :
      group === 'negative' ? '부정' :
      null;

      console.log("Mapped group value:", mappedGroup);

    if (!mappedGroup) {
      return res.status(400).json({
        success: false,
        message: "Invalid group value. Use 'positive' or 'negative'.",
      });
    }

    const traits = await Trait.findFromVanilla(mappedGroup);

    res.json({ success: true, data: traits });
  } catch (error) {
    console.error('Error fetching traits from vanilla:', error); // 로그에 에러 출력
    res.status(500).json({
      success: false,
      message: 'Error fetching traits from vanilla',
      error: error.message || error, // 상세 오류 메시지 포함
    });
  }
};

const getTraitsFromMode = async (req, res) => {
  try {
    const { group } = req.query;

    console.log("Received group value:", group);

    if (!group) {
      return res.status(400).json({
        success: false,
        message: "Group parameter is required",
      });
    }

    const mappedGroup =
      group === 'positive' ? '긍정' :
      group === 'negative' ? '부정' :
      null;

      console.log("Mapped group value:", mappedGroup);

    if (!mappedGroup) {
      return res.status(400).json({
        success: false,
        message: "Invalid group value. Use 'positive' or 'negative'.",
      });
    }

    const traits = await Trait.findFromMode(mappedGroup);

    res.json({ success: true, data: traits });
  } catch (error) {
    console.error('Error fetching traits from vanilla:', error); // 로그에 에러 출력
    res.status(500).json({
      success: false,
      message: 'Error fetching traits from vanilla',
      error: error.message || error, // 상세 오류 메시지 포함
    });
  }
};


module.exports = { getAllTraits, getTraitsFromVanilla, getTraitsFromMode };
