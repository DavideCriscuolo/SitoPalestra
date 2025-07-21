import Jumbo from "./JumboC";

export default function MainAdmin() {
  return (
    <main className="user_main">
      <Jumbo></Jumbo>
      <div className="container mt-4">
        <div className="card w-100 h-100 my-3">
          <div className="cardtop d-flex justify-content-center my-3">
            <img
              className=" w-25  rounded-circle "
              src="img/Frame 2.png"
              alt=""
            />
          </div>
          <div className="card-body m-3">
            <h1 className="text-center">Pagina Admin</h1>
            <div className="row">
              <div className="col border my-4">
                <div className="selectUser">
                  <div className="mb-3">
                    <form id="formAdminMisure" action="">
                      <label for="" className="form-label">
                        Iscritto
                      </label>
                      <select
                        className="form-select form-select-lg"
                        name="selectUser"
                        id="selectUser"
                      ></select>
                      <div className="mb-3">
                        <div className="my-3">
                          <label for="" className="form-label">
                            Misura1
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            name="inputMisura1"
                            id="inputMisura1"
                            aria-describedby="helpId"
                            placeholder="Inserisci Misura vita"
                          />
                        </div>
                        <div className="my-3">
                          <label for="" className="form-label">
                            Misura1
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            name="inputMisura1"
                            id="inputMisura2"
                            aria-describedby="helpId"
                            placeholder="Inserisci Misura vita"
                          />
                        </div>
                        <div className="my-3">
                          <label for="" className="form-label">
                            Misura1
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            name="inputMisura1"
                            id="inputMisura3"
                            aria-describedby="helpId"
                            placeholder="Inserisci Misura vita"
                          />
                        </div>
                        <div className="my-3">
                          <label for="" className="form-label">
                            Misura1
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            name="inputMisura1"
                            id="inputMisura4"
                            aria-describedby="helpId"
                            placeholder="Inserisci Misura vita"
                          />
                        </div>
                        <div className="my-3">
                          <label for="" className="form-label">
                            Data
                          </label>
                          <input
                            type="date"
                            className="form-control"
                            name="inputData"
                            id="inputData"
                            aria-describedby="helpId"
                            placeholder="Inserisci Misura vita"
                          />
                        </div>
                        <div>
                          <button className="btn btn-dark" type="submit">
                            Invia Misure
                          </button>
                        </div>
                      </div>
                    </form>
                    <form id="formAdminScheda" action="">
                      <div className="mb-3">
                        <label for="" className="form-label">
                          Seleziona file
                        </label>
                        <input
                          type="file"
                          className="form-control"
                          name=""
                          id=""
                          placeholder=""
                          aria-describedby="fileHelpId"
                        />
                      </div>
                      <button className="btn btn-dark" type="submit">
                        Invia Scheda
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
