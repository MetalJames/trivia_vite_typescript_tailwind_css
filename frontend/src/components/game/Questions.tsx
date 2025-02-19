import { QuestionComponentProps } from "../../types/types"; 
import { AnswerButton } from "..";

export const Questions = (props: QuestionComponentProps) => {

    const { question, onAnswer, multiplayerEnabled } = props;
    
    const sizeClasses = multiplayerEnabled
        ? "w-40 sm:w-[20vw] h-56 sm:h-28"
        : "w-36 sm:w-[40vw] h-48 sm:h-28";

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-lg sm:text-xl font-bold mb-8 w-[70%] bg-white bg-opacity-70 rounded-md p-3 text-center h-28 flex justify-center items-center">{question.Question}</h2>
            <div className="grid grid-cols-2 gap-7">
                <AnswerButton text={question.AnswerOne} onClick={() => onAnswer(question.AnswerOne)} className={sizeClasses} />
                <AnswerButton text={question.AnswerTwo} onClick={() => onAnswer(question.AnswerTwo)} className={sizeClasses} />
                <AnswerButton text={question.AnswerThree} onClick={() => onAnswer(question.AnswerThree)} className={sizeClasses} />
                <AnswerButton text={question.AnswerFour} onClick={() => onAnswer(question.AnswerFour)} className={sizeClasses} />
            </div>
        </div>
    );
};