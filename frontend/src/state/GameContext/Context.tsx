import { createContext } from "react";
import { GameContextType } from "./types";
import { initState } from "./ProviderInitState";

export const GameContext = createContext<GameContextType>({
    state: initState,
    actions: {
        setQuestions: () => null,
        setPlayerOneName: () => null,
        setPlayerTwoName: () => null,
        setPlayerOneScore: () => null,
        setPlayerTwoScore: () => null,
        setMultiplayerEnabled: () => null,
        setNumberOfQuestions: () => null,
        setChosenCategory: () => null,
        resetGame: () => null,
    }
});