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
    questions: Question[];
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