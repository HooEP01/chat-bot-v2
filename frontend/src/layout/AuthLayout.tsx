import { Suspense } from "react";
import Loading from "../components/Loading";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import CustomToast from "../components/CustomToast";

const AuthLayout = () => {
  return (
    <>
      <CustomToast />
      <div className="w-full h-screen bg-base-200 bg-cover bg-center bg-no-repeat bg-fixed">
        <div className="flex items-center justify-center h-full">
          <Suspense fallback={<Loading />}>
            <motion.div
              key={location.pathname}
              initial="pageInitial"
              animate="pageAnimate"
              exit="pageExit"
              variants={{
                pageInitial: {
                  opacity: 0,
                  y: 50,
                },
                pageAnimate: {
                  opacity: 1,
                  y: 0,
                },
                pageExit: {
                  opacity: 0,
                  y: -50,
                },
              }}
              transition={{
                type: "tween",
                ease: "easeInOut",
                duration: 0.5,
              }}
            >
              {/* <Breadcrumbs /> */}
              {<Outlet />}
            </motion.div>
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
