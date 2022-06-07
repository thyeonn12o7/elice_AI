import { BrowserRouter, Routes, Route } from "react-router-dom";

import StartPage from "./pages/StartPage";
import ChartPage from "./pages/ChartPage";
import SearchPage from "./pages/SearchPage";
import HeaderComponents from "./components/base/Header";
import { SignInPage } from "./pages/sign/SignInPage";
import SignUpPage from "./pages/sign/SignUpPage";
import SignUpCompletePage from "./pages/sign/SignUpCompletePage";
import "./design/fonts.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <HeaderComponents />
        <Routes>
          <Route exact path="/" element={<StartPage />} />
          <Route path="/home" element={<StartPage />} />
          <Route path="/chart" element={<ChartPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/sign-up/complete" element={<SignUpCompletePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
