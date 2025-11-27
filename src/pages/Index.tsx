import { useState } from "react";
import { QuizCard } from "@/components/QuizCard";
import { ResultsCard } from "@/components/ResultsCard";
import { quizQuestions } from "@/data/quizData";

const Index = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    new Array(quizQuestions.length).fill(null)
  );
  const [showResults, setShowResults] = useState(false);

  const handleSelectAnswer = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else if (answers[currentQuestion] !== null) {
      calculateResults();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResults = () => {
    setShowResults(true);
  };

  const calculateScore = () => {
    return answers.reduce((score, answer, index) => {
      if (answer === quizQuestions[index].correctAnswer) {
        return score + 1;
      }
      return score;
    }, 0);
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers(new Array(quizQuestions.length).fill(null));
    setShowResults(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gradient-start to-gradient-end flex items-center justify-center p-4 md:p-8">
      {!showResults ? (
        <QuizCard
          questionNumber={currentQuestion + 1}
          totalQuestions={quizQuestions.length}
          question={quizQuestions[currentQuestion].question}
          options={quizQuestions[currentQuestion].options}
          selectedAnswer={answers[currentQuestion]}
          onSelectAnswer={handleSelectAnswer}
          onNext={handleNext}
          onPrevious={handlePrevious}
          canGoNext={answers[currentQuestion] !== null}
          canGoPrevious={currentQuestion > 0}
        />
      ) : (
        <ResultsCard
          score={calculateScore()}
          totalQuestions={quizQuestions.length}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
};

export default Index;
