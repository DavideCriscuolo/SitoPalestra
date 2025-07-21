export default function MainUser() {
  return (
    <main className="user_main">
      <div className="container-fluid">
        <div className=" jumbo px-sm-3 p-5 mb-4 bg-light rounded-3  my-5 d-flex align-items-end ">
          <div className="container-fluid py-5 text-white">
            <h1 className="fw-bold">PALASPORTMAX</h1>
            <p className="col-md-8 fs-4 fst-italic">
              COSTRUISCI LA TUA FORZA. SUPERA I TUOI LIMITI. DIVENTA LA TUA
              VERSIONE MIGLIORE.
            </p>
          </div>
        </div>
      </div>
      <div className="container mt-4">
        <div className="card w-100 h-100 my-3">
          <div className="cardtop d-flex justify-content-center my-3">
            <img
              className=" w-25 rounded-circle "
              src="./assets/img/Frame 2.png"
              alt=""
            />
          </div>
          <div className="card-body m-3">
            <div id="titleCard" className="title_card text-center"></div>
            <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2">
              <div id="colMisure" className="col border  my-4">
                <h2 className="text-center py-2">Misure</h2>
                <ul id="ListMisure" className="py-3"></ul>
              </div>
              <div className="col border  my-4">
                <h2>Scheda</h2>

                <a href="https://picsum.photos/200" download>
                  Scheda.pfd
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
