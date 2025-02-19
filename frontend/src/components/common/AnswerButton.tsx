type AnswerButtonProps = {
    text: string;
    onClick: () => void;
    className?: string;
};

export const AnswerButton = ({ text, onClick, className = "" }: AnswerButtonProps) => (
    <button
        className={`bg-blue-500 hover:bg-blue-500 xl:hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all break-words text-center ${className}`}
        onClick={onClick}
    >
        {text}
    </button>
);