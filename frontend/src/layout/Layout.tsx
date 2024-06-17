import { Suspense, useState } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import Loading from "../components/Loading";
import { motion } from "framer-motion";
import CustomToast from "../components/CustomToast";
import CustomIcon from "../components/CustomIcon";
import { IconMenu } from "@tabler/icons-react";

const Layout = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const [sideDrawer, toggleSideDrawer] = useState(true);

  const setSideDrawer = () => {
    toggleSideDrawer((prev) => {
      return !prev;
    });
  };
  return (
    <>
      <CustomToast />

      <div className="flex flex-row">
        {/* always open */}
        <div className="drawer lg:drawer-open">
          <input
            id="my-drawer"
            type="checkbox"
            className="drawer-toggle"
            checked={sideDrawer}
            onChange={setSideDrawer}
          />

          <div className="drawer-content bg-base-100">

             {/* Header */}
             <div className="navbar w-full border md:hidden">
              {/* <!-- Logo --> */}

              <div className="flex justify-between w-full">
                <div className="flex-1">
                  <button className="btn btn-ghost text-xl">Chat Bot</button>
                </div>

                <label htmlFor="my-drawer" className="btn drawer-button lg:hidden">
                  <CustomIcon icon={IconMenu} />
                </label>
              </div>
            </div>
            {/* main */}
            <div className="content-wrapper transition-all duration-150 p-6">
              {/* md:min-h-screen will h-full*/}
              <div className="page-content page-min-height">
                <div className="container mx-auto">
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

          {/* side drawer */}
          <div className="drawer-side border">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>

            <div className="menu p-4 w-64 min-h-full bg-base-200 text-base-content">
              <ul className="menu bg-base-200 w-56 rounded-box">
                <li className="mb-4">
                  <button className="btn btn-ghost text-xl">Chat Bot</button>
                </li>

                <li>
                  <Link
                    to="/faq"
                    className={currentPath === "/faq" ? "active" : ""}
                  >
                    Faq
                  </Link>
                </li>
                <li>
                  <Link
                    to="/chat"
                    className={currentPath === "/chat" ? "active" : ""}
                  >
                    Chat
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
