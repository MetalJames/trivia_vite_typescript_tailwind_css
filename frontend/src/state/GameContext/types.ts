import { CategoryOfQuestions } from "../../types/types";
import { GameActionTypes } from "./actionTypes";

export type GameState = {
    playerOneName: string;
    playerTwoName: string;
    playerOneScore: number;
    playerTwoScore: number;
    multiplayerEnabled: boolean;
    numberOfQuestions: number;
    chosenCategory: string;
    questions: CategoryOfQuestions;
};

export type GameAction =
    | { type: typeof GameActionTypes.SET_QUESTIONS; payload: CategoryOfQuestions }
    | { type: typeof GameActionTypes.SET_PLAYER_ONE_NAME; payload: string }
    | { type: typeof GameActionTypes.SET_PLAYER_TWO_NAME; payload: string }
    | { type: typeof GameActionTypes.SET_PLAYER_ONE_SCORE; payload: number }
    | { type: typeof GameActionTypes.SET_PLAYER_TWO_SCORE; payload: number }
    | { type: typeof GameActionTypes.SET_MULTIPLAYER; payload: boolean }
    | { type: typeof GameActionTypes.SET_NUMBER_OF_QUESTIONS; payload: number }
    | { type: typeof GameActionTypes.SET_CHOSEN_CATEGORY; payload: string }
    | { type: typeof GameActionTypes.RESET_GAME };

export interface GameActions {
    setPlayerOneName: (name: string) => void;
    setPlayerTwoName: (name: string) => void;
    setPlayerOneScore: (score: number) => void;
    setPlayerTwoScore: (score: number) => void;
    setMultiplayerEnabled: (enabled: boolean) => void;
    setNumberOfQuestions: (num: number) => void;
    setChosenCategory: (category: string) => void;
    setQuestions: (questions: CategoryOfQuestions) => void;
    resetGame: () => void;
}

export interface GameContextType {
    state: GameState;
    actions: GameActions;
}