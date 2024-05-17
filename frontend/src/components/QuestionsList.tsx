type Question = {
    QuestionID: string;
    Question: string;
}

type QuestionsListProps = {
    questions: Question[];
}

//const QuestionsList: React.FC<QuestionsListProps> = ({ questions }) => {
const QuestionsList = (props: QuestionsListProps) => {

    const { questions } = props;

    if (!questions || questions.length === 0) {
        return <div>No questions available</div>;
    }

    return (
        <div>
        <ul>
            {questions.map((q) => (
            <li key={q.QuestionID}>{q.Question}</li>
            ))}
        </ul>
        </div>
    );
};

export default QuestionsList;
