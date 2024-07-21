import { Suspense, useEffect, useState } from "react";
import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { motion } from "framer-motion";
import CustomToast from "../components/CustomToast";
import CustomIcon from "../components/CustomIcon";
import {
  IconBell,
  IconMenu,
  IconMessage,
  IconUser,
  IconZoomQuestion,
} from "@tabler/icons-react";
import { useHttpError } from "../hooks/http-error";
import { useDispatch, useSelector } from "react-redux";
import { getIsAuth, getToken } from "../selectors/auth";
import { AppDispatch } from "../store";
import { logout } from "../store/auth/authSlice";

const Layout = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const isAuth = useSelector(getIsAuth());
  const token = useSelector(getToken());
  const navigate = useNavigate();

  const [sideDrawer, toggleSideDrawer] = useState(true);
  const dispatch: AppDispatch = useDispatch();

  const setSideDrawer = () => {
    toggleSideDrawer((prev) => {
      return !prev;
    });
  };

  useEffect(() => {
    if (!isAuth || !token) {
      navigate("/");
    }
  }, [isAuth, token, navigate]);

  useHttpError();

  const logoutAccount = () => {
    dispatch(logout()).then(() => {
      navigate("/");
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
            <div className="navbar w-full md:hidden">
              {/* <!-- Logo --> */}

              <div className="flex justify-between w-full">
                <div className="flex-1">
                  <button className="btn btn-ghost text-xl">Chat Bot</button>
                </div>

                <label
                  htmlFor="my-drawer"
                  className="btn drawer-button lg:hidden"
                >
                  <CustomIcon icon={IconMenu} />
                </label>
              </div>
            </div>
            {/* main */}
            <div className="content-wrapper transition-all duration-150">
              {/* md:min-h-screen will h-full*/}
              <div className="page-content page-min-height">
                <div className="container max-w-screen-lg mx-auto">
                  <div className="flex h-28 w-full justify-end items-center gap-4 px-4 md:px-8">
                    <button className="btn btn-circle">
                      <CustomIcon icon={IconBell} />
                    </button>

                    <div className="dropdown dropdown-end">
                      <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-circle"
                      >
                        <CustomIcon icon={IconUser} />
                      </div>
                      <ul
                        tabIndex={0}
                        className="dropdown-content menu bg-base-200 rounded-box z-[1] w-52 p-2 mt-2 shadow"
                      >
                        <li onClick={logoutAccount}>
                          <a>Logout</a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="p-4 md:p-8">
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
          </div>

          {/* side drawer */}
          <div className="drawer-side">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>

            <div className="menu p-4 w-64 min-h-full text-base-content bg-base-200 md:bg-transparent">
              <div className="flex justify-center items-center h-28">
                <p className="text-xl font-bold text-center">CHATAPP</p>
              </div>
              <ul className="menu w-56 rounded-box gap-4">
                <li>
                  <Link
                    to="/faq"
                    className={currentPath === "/faq" ? "active" : ""}
                  >
                    <CustomIcon icon={IconZoomQuestion} />
                    Faq
                  </Link>
                </li>
                <li>
                  <Link
                    to="/chat"
                    className={currentPath === "/chat" ? "active" : ""}
                  >
                    <CustomIcon icon={IconMessage} />
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
