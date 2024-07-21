import { Suspense } from "react";
import Loading from "../components/Loading";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import CustomToast from "../components/CustomToast";
import CustomIcon from "../components/CustomIcon";
import { IconX } from "@tabler/icons-react";

const AuthLayout = () => {
  return (
    <div className="h-screen bg-base-200">
      <CustomToast />
      <div className="navbar bg-base-100">
        <div className="container max-w-screen-xl m-auto navbar bg-base-100">
          <div className="flex-1">
            <a className="btn btn-ghost text-xl">CHATAPP</a>
          </div>
          <div className="flex-0">
            <button className="btn btn-ghost btn-circle">
              <CustomIcon icon={IconX} />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-cover bg-center bg-no-repeat bg-fixed">
        <div className="container max-w-screen-xl m-auto px-4">
          <div className="py-16">
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
      </div>
    </div>
  );
};

export default AuthLayout;
