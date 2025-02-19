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

export type CategoryOfQuestions = Record<string, Question[]>

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

export type GameStuffWinnerScreen = {
    playerOneName: string;
    playerTwoName: string;
    playerOneScore: number;
    playerTwoScore: number;
    multiplayerEnabled: boolean;
    numberOfQuestions: number;
};

export type Score = {
    name: string;
    score: number;
}