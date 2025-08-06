import { BrowserRouter, Routes, Route } from "react-router-dom"; //serve per la navigazione tra le pagine
import Home from "./pages/Home";
import UserPage from "./pages/UserPage";
import AdminPage from "./pages/AdminPage";
import Defaultlayout from "./layouts/DefaultLayout";
import PageLogin from "./components/PageLogin";
import NotFound from "./pages/NotFound";
import Registrazione from "./pages/Regitrazione";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Defaultlayout></Defaultlayout>}>
            <Route path="/" element={<Home></Home>} />
            <Route path="/user" element={<UserPage></UserPage>} />
            <Route path="/admin" element={<AdminPage></AdminPage>} />
            <Route path="/login" element={<PageLogin></PageLogin>} />
            <Route
              path="/register"
              element={<Registrazione></Registrazione>}
            ></Route>
            <Route path="/*" element={<NotFound></NotFound>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
