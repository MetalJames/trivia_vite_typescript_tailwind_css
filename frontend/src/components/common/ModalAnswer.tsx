type ModalProps = {
    message: string
}

export const ModalAnswer = ({ message }: ModalProps) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-40">
            <div className="bg-white rounded-lg p-6 shadow-lg z-50">
                <p className="text-xl font-semibold text-center">{message}</p>
            </div>
            <div className="fixed inset-0 bg-black opacity-30 z-30"></div>
        </div>
    );
};