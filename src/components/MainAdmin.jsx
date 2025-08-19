import axios from "axios"; // per fare richieste  http al server
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Jumbo from "./JumboC";
import LoaderC from "./LoaderC";
import FormMisure from "./FormMisure";

export default function MainAdmin() {
  // Logica per ricevere  tutti i dati dall endpoint tramite una chiamata ajax fatta con axios
  const token = localStorage.getItem("token");
  const url = import.meta.env.VITE_URL_REQUEST_DATA_ADMIN;
  const [isLoading, setIsLoading] = useState(true);
  const [dataUser, setDataUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  function requestData() {
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`, // <- importantissimo
        },
      })
      .then((res) => {
        setIsLoading(false);
        console.log("Dati admin:", res.data);
        setDataUser(res.data);
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          console.log("Errore 401: token mancante o non valido");
        } else {
          console.error(err);
        }
      });
  }

  useEffect(requestData, []);

  return (
    <main className="user_main">
      <div className="container mt-4">
        {isLoading ? (
          <LoaderC />
        ) : (
          <div className="card w-100 h-100 my-3">
            <div className="cardtop d-flex justify-content-center my-3">
              <img
                className=" w-25  rounded-circle "
                src="img/Frame2.png"
                alt="img admin"
              />
            </div>
            <div className="card-body m-3">
              <h1 className="text-center">Pagina Admin</h1>
              <div className="row">
                <div className="col border my-4">
                  <div className="selectUser">
                    <div className="mb-3">
                      <FormMisure
                        users={dataUser}
                        requestData={requestData}
                        onSelectUser={(user) => setSelectedUser(user)}
                      ></FormMisure>
                    </div>
                  </div>
                </div>
              </div>
              <NavLink className="btn btn-secondary" to="/">
                {" "}
                Logout
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
