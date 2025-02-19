import { GameActionTypes } from "./actionTypes";
import { initState } from "./ProviderInitState";
import { GameState, GameAction } from "./types";

export const gameReducer = (state: GameState, action: GameAction): GameState => {
    switch (action.type) {
        case GameActionTypes.SET_QUESTIONS:
            return { ...state, questions: action.payload };
        case GameActionTypes.SET_PLAYER_ONE_NAME:
            return { ...state, playerOneName: action.payload };
        case GameActionTypes.SET_PLAYER_TWO_NAME:
            return { ...state, playerTwoName: action.payload };
        case GameActionTypes.SET_PLAYER_ONE_SCORE:
            return { ...state, playerOneScore: action.payload };
        case GameActionTypes.SET_PLAYER_TWO_SCORE:
            return { ...state, playerTwoScore: action.payload };
        case GameActionTypes.SET_MULTIPLAYER:
            return { ...state, multiplayerEnabled: action.payload };
        case GameActionTypes.SET_NUMBER_OF_QUESTIONS:
            return { ...state, numberOfQuestions: action.payload };
        case GameActionTypes.SET_CHOSEN_CATEGORY:
            return { ...state, chosenCategory: action.payload };
        case GameActionTypes.RESET_GAME:
            return {
                ...state,
                ...initState,
                questions: state.questions
            };
        default:
            return state;
    }
};