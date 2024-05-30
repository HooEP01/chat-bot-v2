import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import Layout from "./layout/Layout";
import Loading from "./components/Loading";

const Dashboard = lazy(() => import("./pages/dashboard"));
const Faq = lazy(() => import("./pages/faq"));
const Chat = lazy(() => import("./pages/chat"));

const Error = lazy(() => import("./pages/404"));

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/*" element={<Navigate to="/404" />} />
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
