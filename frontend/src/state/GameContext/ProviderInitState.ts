import { CategoryOfQuestions } from "../../types/types";
import { GameState } from "./types";

export const initState: GameState = {
    playerOneName: 'Player One',
    playerTwoName: 'Player Two',
    playerOneScore: 0,
    playerTwoScore: 0,
    multiplayerEnabled: false,
    numberOfQuestions: 5,
    chosenCategory: 'General',
    questions: {} as CategoryOfQuestions,
}