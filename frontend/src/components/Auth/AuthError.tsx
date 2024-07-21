const AuthError = () => {
    return (
        <div className="card m-6 md:w-96 bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">Error</h2>
                <p className="text-start mb-3">
                    Something went wrong. Please try again.
                </p>
            </div>
        </div>
    );
};

export default AuthError;