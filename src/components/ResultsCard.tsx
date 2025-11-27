import { motion } from "framer-motion";
import { Trophy, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResultsCardProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

export const ResultsCard = ({ score, totalQuestions, onRestart }: ResultsCardProps) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  const getMessage = () => {
    if (percentage === 100) return "Perfect Score! 🎉";
    if (percentage >= 80) return "Excellent Work! 🌟";
    if (percentage >= 60) return "Good Job! 👏";
    if (percentage >= 40) return "Not Bad! 💪";
    return "Keep Practicing! 📚";
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-card rounded-[2rem] p-8 md:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] w-full max-w-2xl"
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="inline-flex items-center justify-center w-24 h-24 bg-primary/10 rounded-full mb-6"
        >
          <Trophy className="w-12 h-12 text-primary" />
        </motion.div>

        <h1 className="text-4xl md:text-5xl font-display font-bold text-primary mb-3">
          Quiz Complete!
        </h1>
        
        <p className="text-xl text-muted-foreground mb-8">{getMessage()}</p>

        <div className="bg-gradient-to-br from-gradient-start to-gradient-end rounded-2xl p-8 mb-8">
          <div className="text-6xl font-bold text-primary mb-2">
            {score}/{totalQuestions}
          </div>
          <p className="text-lg text-foreground">Correct Answers</p>
          <div className="mt-4 text-4xl font-bold text-secondary">
            {percentage}%
          </div>
        </div>

        <Button
          onClick={onRestart}
          size="lg"
          className="rounded-full px-8 font-medium"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          Try Again
        </Button>
      </div>
    </motion.div>
  );
};
