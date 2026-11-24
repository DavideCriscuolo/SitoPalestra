import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; //serve per la navigazione tra le pagine
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Home from "./pages/Home";
import UserPage from "./pages/UserPage";
import AdminPage from "./pages/AdminPage";
import Defaultlayout from "./layouts/DefaultLayout";
import PageLogin from "./pages/PageLoginUser";
import NotFound from "./pages/NotFound";
import Animate from "./components/Animate";
import { MotionConfig } from "framer-motion";
import { MEMBER_AREA_ENABLED } from "./data/site";

// Con l'area iscritti disattivata le sue pagine rimandano alla home.
const member = (page) => (MEMBER_AREA_ENABLED ? page : <Navigate to="/" replace />);
import Registrazione from "./pages/Regitrazione";
import PageLoginAdmin from "./pages/PageLoginAdmin";
import AdminRoute from "./components/AdminRoute";
import UserRoute from "./components/UserRoute";
import PageResetP from "./pages/PageResetP";
import Privacy from "./pages/Privacy";
import { SpeedInsights } from "@vercel/speed-insights/react"; // vercel speed insights serve per monitotare velocita pagine ecc
import { Analytics } from "@vercel/analytics/react"; //vercell per dati sui visitatori
// <script
//   src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js"
//   integrity="sha384-BBtl+eGJRgqQAUMxJ7pMwbEyER4l1g+O15P+16Ep7Q9Q+zqX6gSbd85u4mG4QzX+"
//   crossorigin="anonymous"
// ></script>;
function App() {
  return (
    <>
      {import.meta.env.MODE === "production" && <Analytics />}
      {import.meta.env.MODE === "production" && <SpeedInsights />}
      <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <Animate>
          <Routes>
            <Route element={<Defaultlayout></Defaultlayout>}>
              <Route path="/" element={<Home></Home>} />
              <Route path="/privacy" element={<Privacy />} />

              <Route path="/login" element={member(<PageLogin></PageLogin>)} />
              <Route
                path="/login_admin"
                element={<PageLoginAdmin></PageLoginAdmin>}
              ></Route>
              <Route
                path="/register"
                element={member(<Registrazione></Registrazione>)}
              ></Route>
              <Route
                path="/reset-password/:token"
                element={member(<PageResetP></PageResetP>)}
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
                element={member(
                  <UserRoute>
                    <UserPage></UserPage>
                  </UserRoute>
                )}
              ></Route>
            </Route>
          </Routes>
        </Animate>
      </BrowserRouter>
      </MotionConfig>
    </>
  );
}

export default App;
