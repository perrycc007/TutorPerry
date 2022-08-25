import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Profile from "./component/Profile"
import Cases from "./component/Cases"
import Auth from "./component/Auth";
import Apply from "./component/Apply";
import Favourite from "./component/Favourite";
import Layout from './component/Layout/Layout';
import userStore from "./stores";

function App() {
  const isLoggedin = userStore(state => state.isLoggedin);
  return (
    <div className="App">

        <BrowserRouter>
        <Layout>
            <Routes>
              <Route path="/" element={<Cases />} />
              {!isLoggedin && (<Route path="/auth" element={<Auth />} />)}
              <Route path="/apply" element={isLoggedin ? <Apply /> : <Navigate to="/auth" replace/>} />
              {isLoggedin && (<Route path="/profile" element={<Profile />} />)}
              <Route path="/favourite" element={isLoggedin ? <Favourite />: <Navigate to="/auth" replace/>} />
              <Route path="/cases" element={<Cases />} />
            </Routes>
            </Layout>
        </BrowserRouter>

    </div>
  );
}

export default App;
