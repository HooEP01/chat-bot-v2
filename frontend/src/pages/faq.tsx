import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Faq from "../components/Faq/Faq";
import FaqSkeleton from "../components/Faq/FaqSkeleton";
import FaqError from "../components/Faq/FaqError";

const FaqPage = () => {
  

  return (
    <>
    <ErrorBoundary
        fallback={<FaqError />}
        onReset={(details) => {
          console.log(details);
        }}
      >
        <Suspense fallback={<FaqSkeleton />}>
          <Faq />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default FaqPage;
