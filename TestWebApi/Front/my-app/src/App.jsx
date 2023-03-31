import LoginPage from "./components/LoginPage/LoginPage";
import MainPage from "./components/MainPage/MainPage";
import { Routes, Route } from "react-router-dom";
import ConstantsList from "./ConstantRepository/ConstantsList";
import TestPage from "./components/TestPage/TestPage";

const App = () => {
  return (
    <Routes>
      <Route path={ConstantsList.ROUTE_LOGIN_PAGE} element={<LoginPage />} />
      <Route path={ConstantsList.ROUTE_MAIN_PAGE} element={<MainPage />} />
      <Route path={ConstantsList.ROUTE_TEST_PAGE} element={<TestPage />} />
    </Routes>
  );
};

export default App;
