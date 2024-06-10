// Define the types for entire context
export type GameContextType =  {
    playerOneName: string;
    setPlayerOneName: (name: string) => void;
    playerTwoName: string;
    setPlayerTwoName: (name: string) => void;
    playerOneScore: number;
    setPlayerOneScore: (score: number) => void;
    playerTwoScore: number;
    setPlayerTwoScore: (score: number) => void;
    multiplayerEnabled: boolean;
    setMultiplayerEnabled: (enabled: boolean) => void;
    numberOfQuestions: number;
    setNumberOfQuestions: (num: number) => void;
    chosenCategory: string;
    setChosenCategory: (category: string) => void;
    questions: CategoryOfQuestions[];
    setQuestions: (questions: CategoryOfQuestions[]) => void;
    resetAll: () => void;
}

export type HomeProps = {
    setPlayerOneName: (name: string) => void;
    setPlayerTwoName: (name: string) => void;
    multiplayerEnabled: boolean;
    setMultiplayerEnabled: (enable: boolean) => void;
    setNumberOfQuestions: (number: number) => void;
    setChosenCategory: (string: string) => void;
}

export type Score = {
    name: string;
    score: number;
}

export type GameStuffGameScreen = {
    questions: CategoryOfQuestions[];
    playerOneName: string;
    playerTwoName: string;
    playerOneScore: number;
    playerTwoScore: number;
    setPlayerOneScore: (score: number) => void;
    setPlayerTwoScore: (score: number) => void;
    multiplayerEnabled: boolean;
    numberOfQuestions: number;
    chosenCategory: string;
    resetAll: () => void;
};

export type PlayerProps = {
    playerName: string;
    playerScore: number;
    questions: Question | null;
    onAnswer: (selectedAnswer: string) => void;
    multiplayerEnabled: boolean;
}

export type QuestionComponentProps = {
    question: Question;
    onAnswer: (answe: string) => void;
    multiplayerEnabled: boolean;
};

export type CategoryOfQuestions = {
    Games: Question[];
    General: Question[];
    IT: Question[];
}

export type Question = {
    _id: string;
    QuestionID: string;
    Question: string;
    AnswerOne: string;
    AnswerTwo: string;
    AnswerThree: string;
    AnswerFour: string;
    CorrectAnswer: string;
};

export type GameStuffWinnerScreen = {
    playerOneName: string;
    playerTwoName: string;
    playerOneScore: number;
    playerTwoScore: number;
    multiplayerEnabled: boolean;
    numberOfQuestions: number;
};