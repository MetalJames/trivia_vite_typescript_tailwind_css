import { Component, ReactNode, ErrorInfo } from "react";
import { Link } from "react-router-dom";

type Props = {
    children: ReactNode;
};

type State = {
    hasError: boolean;
};

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        // Update state so the next render will show the fallback UI.
        console.log(error);
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // You can also log the error to an error reporting service
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
        // You can render any custom fallback UI
        return (
            <div className="flex flex-col h-screen justify-center items-center">
                <h1>Something went wrong.</h1>
                <p>
                    There was an error in the application. Please go back to the home
                    page and try again.
                </p>
                <Link to="/">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Home
                    </button>
                </Link>
            </div>
        );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
