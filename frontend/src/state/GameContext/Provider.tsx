import { ReactNode, useMemo, useReducer, useCallback } from "react"
import { gameReducer } from "./Reducer"
import { initState } from "./ProviderInitState"
import { GameContext } from "./Context";
import { GameActions } from "./types";
import { GameActionTypes } from "./actionTypes";
import { CategoryOfQuestions } from "../../types/types";

export const GameProvider = ({ children }: { children: ReactNode }) => {

    const [state, dispatch] = useReducer(gameReducer, initState);

    const setQuestions = useCallback((questions: CategoryOfQuestions) => {
        dispatch({ type: GameActionTypes.SET_QUESTIONS, payload: questions });
    }, []);

    const setPlayerOneName = useCallback((name: string) => {
        dispatch({ type: GameActionTypes.SET_PLAYER_ONE_NAME, payload: name });
    }, []);

    const setPlayerTwoName = useCallback((name: string) => {
        dispatch({ type: GameActionTypes.SET_PLAYER_TWO_NAME, payload: name });
    }, []);

    const setPlayerOneScore = useCallback((score: number) => {
        dispatch({ type: GameActionTypes.SET_PLAYER_ONE_SCORE, payload: score });
    }, []);

    const setPlayerTwoScore = useCallback((score: number) => {
        dispatch({ type: GameActionTypes.SET_PLAYER_TWO_SCORE, payload: score });
    }, []);

    const setMultiplayerEnabled = useCallback((enabled: boolean) => {
        dispatch({ type: GameActionTypes.SET_MULTIPLAYER, payload: enabled });
    }, []);

    const setNumberOfQuestions = useCallback((num: number) => {
        dispatch({ type: GameActionTypes.SET_NUMBER_OF_QUESTIONS, payload: num });
    }, []);

    const setChosenCategory = useCallback((category: string) => {
        dispatch({ type: GameActionTypes.SET_CHOSEN_CATEGORY, payload: category });
    }, []);

    const resetGame = useCallback(() => {
        dispatch({ type: GameActionTypes.RESET_GAME });
    }, []);

    const actions: GameActions = useMemo(() => ({
        setQuestions,
        setPlayerOneName,
        setPlayerTwoName,
        setPlayerOneScore,
        setPlayerTwoScore,
        setMultiplayerEnabled,
        setNumberOfQuestions,
        setChosenCategory,
        resetGame,
    }), [
        setQuestions,
        setPlayerOneName,
        setPlayerTwoName,
        setPlayerOneScore,
        setPlayerTwoScore,
        setMultiplayerEnabled,
        setNumberOfQuestions,
        setChosenCategory,
        resetGame,
    ]);

    const contextValue = useMemo(() => ({ state, actions }), [state, actions]);

    return (
        <GameContext.Provider value={ contextValue }>
            {children}
        </GameContext.Provider>
    )
}