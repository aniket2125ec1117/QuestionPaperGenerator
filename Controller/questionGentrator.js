const question = require("../Modals/questionStore");

// Creating a class that takes input total Marks and difficulty (in json format)

class QuestionGenerator {
  constructor() {
    this.question = question;
  }
  async genrateQuestion(totalMarks, difficultyDistribution) {
    // Here the questionPaper will give the question based on the total marks and difficulty distribution
    const questionPaper = [];

    for (let difficulty of Object.keys(difficultyDistribution)) {
      console.log(Object.keys(difficultyDistribution));
      // Objects.keys(difficultyDistribution) return array ['Easy', 'Medium', 'Hard']
      // percentage is the percentage weightage of easy medium and hard
      const percentage = difficultyDistribution[difficulty];
      console.log(difficulty, percentage);
      // marksForDifficulty is the marks based of the percentage difficulty level to the total marks of question
      const marksForDifficulty = (totalMarks * percentage) / 100;
      console.log("marksForDifficulty", difficulty, marksForDifficulty);
      // question will return the question based on the difficulty ie easy medium hard and marksForDifficulty
      const questions = await this.getQuestionByDifficulty(
        difficulty,
        marksForDifficulty
      );
      console.log(questions);
      // resulted question will pust to questionPaper
      questionPaper.push(...questions);
    }
    
    // Now we return the questionPaper
    return questionPaper;
  }
  async getQuestionByDifficulty(difficulty, difficultyMarks) {
    const questionDifficultyType = this.question.filter(
      (question) => question.Difficulty === difficulty
    );
    //console.log("questionDifficultyType", questionDifficultyType);

    const filteredQuestion = [];
    let leftMarks = difficultyMarks;

    while (leftMarks > 0 && questionDifficultyType.length > 0) {
      const randomIndex = Math.floor(
        Math.random() * questionDifficultyType.length
      );
      const selectedQuestion = questionDifficultyType.splice(randomIndex, 1)[0];

      if (selectedQuestion.Marks <= leftMarks) {
        filteredQuestion.push(selectedQuestion);
        leftMarks -= selectedQuestion.Marks;
      }
    }

    return filteredQuestion;
  }
}

// Exporting the class Question Generator
module.exports = { QuestionGenerator };
