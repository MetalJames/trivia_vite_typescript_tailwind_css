const ErrorCategory = ({ chosenCategory }: { chosenCategory: string }) => (
    <div>
        <h1>Error: Invalid category</h1>
        <p>The chosen category "{chosenCategory}" is not recognized.</p>
        <p>Please select a valid category.</p>
    </div>
);

export default ErrorCategory;