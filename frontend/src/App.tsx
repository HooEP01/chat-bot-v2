import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import Layout from "./layout/Layout";
import Loading from "./components/Loading";
import AuthLayout from "./layout/AuthLayout";

const Auth = lazy(() => import("./pages/auth"));

const Faq = lazy(() => import("./pages/faq"));
const Chat = lazy(() => import("./pages/chat"));

const Error = lazy(() => import("./pages/404"));

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route path="" element={<Auth />} />
        </Route>
        <Route path="/*" element={<Layout />}>
          <Route path="faq" element={<Faq />} />
          <Route path="chat" element={<Chat />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Route>
        <Route
          path="/404"
          element={
            <Suspense fallback={<Loading />}>
              <Error />
            </Suspense>
          }
        />
      </Routes>
    </main>
  );
}

export default App;
