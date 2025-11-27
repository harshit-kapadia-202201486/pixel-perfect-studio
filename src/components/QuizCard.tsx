import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import catPaw from "@/assets/cat-paw.png";

interface QuizCardProps {
  questionNumber: number;
  totalQuestions: number;
  question: string;
  options: string[];
  selectedAnswer: number | null;
  onSelectAnswer: (index: number) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
}

export const QuizCard = ({
  questionNumber,
  totalQuestions,
  question,
  options,
  selectedAnswer,
  onSelectAnswer,
  onNext,
  onPrevious,
  canGoNext,
  canGoPrevious,
}: QuizCardProps) => {
  return (
    <div className="relative w-full max-w-4xl">
      {/* Mascot */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute -left-4 md:-left-20 top-1/2 -translate-y-1/2 z-10"
      >
        <div className="bg-card rounded-3xl px-4 py-2 shadow-lg relative">
          <p className="text-sm font-medium text-foreground whitespace-nowrap">Best of Luck !</p>
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-card rotate-45" />
        </div>
        <img src={catPaw} alt="Cat paw" className="w-20 h-20 mt-4 ml-8" />
      </motion.div>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card rounded-[2rem] p-8 md:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] relative"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-primary mb-3">
            Test Your Knowledge
          </h1>
          <p className="text-muted-foreground">Answer all questions to see your results</p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-accent rounded-full h-1 mb-8">
          <motion.div
            className="bg-primary h-1 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Question */}
        <motion.div
          key={questionNumber}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-question-bg rounded-2xl p-6 mb-6">
            <h2 className="text-lg font-medium text-foreground text-center">
              {questionNumber}. {question}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-4 mb-8">
            {options.map((option, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectAnswer(index)}
                className={`w-full p-4 rounded-xl text-center font-medium transition-all duration-200 ${
                  selectedAnswer === index
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-card border-2 border-border hover:bg-answer-hover text-foreground"
                }`}
              >
                {option}
              </motion.button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onPrevious}
              disabled={!canGoPrevious}
              className="rounded-full w-12 h-12 disabled:opacity-30"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onNext}
              disabled={!canGoNext}
              className="rounded-full w-12 h-12 bg-accent hover:bg-primary hover:text-primary-foreground disabled:opacity-30"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
