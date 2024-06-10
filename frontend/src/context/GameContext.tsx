import { createContext, useState, ReactNode } from 'react';
import { CategoryOfQuestions } from '../types/types';
// Getting game context types
import { GameContextType } from '../types/types';

// Create the context with default values
export const GameContext = createContext<GameContextType | undefined>(undefined);

// Create the provider component
export const GameProvider = ({ children }: { children: ReactNode }) => {
    const [playerOneName, setPlayerOneName] = useState('Player One');
    const [playerTwoName, setPlayerTwoName] = useState('Player Two');
    const [playerOneScore, setPlayerOneScore] = useState(0);
    const [playerTwoScore, setPlayerTwoScore] = useState(0);
    const [multiplayerEnabled, setMultiplayerEnabled] = useState(false);
    const [numberOfQuestions, setNumberOfQuestions] = useState(5);
    const [chosenCategory, setChosenCategory] = useState('General');
    const [questions, setQuestions] = useState<CategoryOfQuestions[]>([]);

    const resetAll = () => {
        setPlayerOneName('Player One');
        setPlayerTwoName('Player Two');
        setPlayerOneScore(0);
        setPlayerTwoScore(0);
        setMultiplayerEnabled(false);
        setNumberOfQuestions(5);
        setChosenCategory('General');
    };

    return (
        <GameContext.Provider
            value={{
                playerOneName,
                setPlayerOneName,
                playerTwoName,
                setPlayerTwoName,
                playerOneScore,
                setPlayerOneScore,
                playerTwoScore,
                setPlayerTwoScore,
                multiplayerEnabled,
                setMultiplayerEnabled,
                numberOfQuestions,
                setNumberOfQuestions,
                chosenCategory,
                setChosenCategory,
                questions,
                setQuestions,
                resetAll,
            }}
        >
            {children}
        </GameContext.Provider>
    );
};
