const { QuestionGenerator }= require("./questionGentrator");
const generatedQuestion = async function (req, res) {
  try {
    const questionGentrators = new QuestionGenerator();
    const totalMarks = req.params.totalMarks;
    const difficulty = req.body;

    const generatedQuestions = await questionGentrators.genrateQuestion(
      totalMarks,
      difficulty
    );

    console.log(generatedQuestions);
    res.status(200).json({
      generatedQuestions,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err.message,
    });
  }
};

module.exports = generatedQuestion;
