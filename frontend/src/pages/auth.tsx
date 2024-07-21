import { ErrorBoundary } from "react-error-boundary";
import AuthError from "../components/Auth/AuthError";
import AuthSkeleton from "../components/Auth/AuthSkeleton";
import { Suspense } from "react";
import Auth from "../components/Auth/Auth";

const AuthPage = () => {
  return (
    <>
      <ErrorBoundary
        fallback={<AuthError />}
        onReset={(details) => {
          console.log(details);
        }}
      >
        <Suspense fallback={<AuthSkeleton />}>
          <Auth />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default AuthPage;
