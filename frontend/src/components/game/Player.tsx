import { Questions, NoMoreQuestions } from "..";
import { PlayerProps } from "../../types/types";

export const Player = (props: PlayerProps) => {

    const { playerName, playerScore, questions, onAnswer, multiplayerEnabled } = props;

    return (
        <div className="flex flex-col justify-start sm:justify-center h-full w-full">
                <div className="h-[20vw] w-full flex flex-col justify-center items-center mt-5 sm:mt-0">
                    <h1 className="text-3xl sm:text-5xl font-bold text-sky-700 mt-5 mb-3">{playerName}</h1>
                    <p className="font-bold mb-2">Your Score: {playerScore}</p>
                </div>
                {questions ? (
                    <div className="flex flex-col justify-center h-full sm:h-1/2">
                        <Questions
                            question={questions}
                            onAnswer={onAnswer}
                            multiplayerEnabled={multiplayerEnabled}
                        />
                    </div>
                ) : (<NoMoreQuestions />)}
            </div>
    )
};