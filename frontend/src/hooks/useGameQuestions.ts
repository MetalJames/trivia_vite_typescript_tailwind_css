import { useMemo } from "react";
import { CategoryOfQuestions, Question } from "../types/types";

export const useGameQuestions = (questions: CategoryOfQuestions, chosenCategory: string, multiplayerEnabled: boolean, numberOfQuestions: number) => {
    return useMemo(() => {
        const categoryQuestions: Question[] = questions[chosenCategory as keyof CategoryOfQuestions] || [];
        const shuffledQuestions = [...categoryQuestions].sort(() => 0.5 - Math.random());

        const playerOneQuestions = [];
        const playerTwoQuestions = [];

        if (multiplayerEnabled) {
            const totalQuestionsNeeded = numberOfQuestions * 2;
            const availableQuestions = Math.min(totalQuestionsNeeded, shuffledQuestions.length);
            const questionsPerPlayer = Math.floor(availableQuestions / 2);

            for (let i = 0; i < availableQuestions; i++) {
                if (i % 2 === 0 && playerOneQuestions.length < questionsPerPlayer) {
                    playerOneQuestions.push(shuffledQuestions[i]);
                } else if (playerTwoQuestions.length < questionsPerPlayer) {
                    playerTwoQuestions.push(shuffledQuestions[i]);
                }
            }
        } else {
            const availableQuestions = Math.min(numberOfQuestions, shuffledQuestions.length);
            for (let i = 0; i < availableQuestions; i++) {
                playerOneQuestions.push(shuffledQuestions[i]);
            }
        }

        return [playerOneQuestions, playerTwoQuestions];
    }, [chosenCategory, multiplayerEnabled, questions, numberOfQuestions]);
};