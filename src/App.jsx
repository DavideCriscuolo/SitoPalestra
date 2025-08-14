import { BrowserRouter, Routes, Route } from "react-router-dom"; //serve per la navigazione tra le pagine
import Home from "./pages/Home";
import UserPage from "./pages/UserPage";
import AdminPage from "./pages/AdminPage";
import Defaultlayout from "./layouts/DefaultLayout";
import PageLogin from "./pages/PageLoginUser";
import NotFound from "./pages/NotFound";
import Registrazione from "./pages/Regitrazione";
import PageLoginAdmin from "./pages/PageLoginAdmin";
import AdminRoute from "./components/AdminRoute";
import UserRoute from "./components/UserRoute";
import PageResetP from "./pages/PageResetP";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Defaultlayout></Defaultlayout>}>
            <Route path="/" element={<Home></Home>} />

            <Route path="/login" element={<PageLogin></PageLogin>} />
            <Route
              path="/login_admin"
              element={<PageLoginAdmin></PageLoginAdmin>}
            ></Route>
            <Route
              path="/register"
              element={<Registrazione></Registrazione>}
            ></Route>
            <Route
              path="/reset-password/:token"
              element={<PageResetP></PageResetP>}
            ></Route>

            {/* Pagine protette */}

            <Route path="*" element={<NotFound></NotFound>}></Route>
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminPage></AdminPage>
                </AdminRoute>
              }
            ></Route>
            <Route
              path="/user"
              element={
                <UserRoute>
                  <UserPage></UserPage>
                </UserRoute>
              }
            ></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
