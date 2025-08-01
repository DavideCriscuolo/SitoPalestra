import { BrowserRouter, Routes, Route } from "react-router-dom"; //serve per la navigazione tra le pagine
import Home from "./pages/Home";
import UserPage from "./pages/UserPage";
import AdminPage from "./pages/AdminPage";
import Defaultlayout from "./layouts/DefaultLayout";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Defaultlayout></Defaultlayout>}>
            <Route path="/" element={<Home></Home>} />
            <Route path="/user" element={<UserPage></UserPage>} />
            <Route path="/admin" element={<AdminPage></AdminPage>} />
            <Route path="/*" element={<h1>Not Fuond</h1>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
