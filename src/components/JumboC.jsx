import "./../css/Jumbo.scss";

export default function Jumbo() {
  return (
    <div class=" mb-4 rounded-3">
      <div class="container-fluid containerVideo position-relative top-0 start-0  d-inline-flex flex-column justify-content-end p-2 ">
        <video
          className="video rounded-3  position-absolute top-0 p-1  start-0 w-100 "
          autoPlay
          muted
          loop
          src="./img/Video_jumbo.mp4"
        ></video>
        <div className="p-1">
          <div>
            {" "}
            <h1 className="text-white fw-bold m-0 p-xl-1">PALASPORTMAX</h1>{" "}
          </div>
          <div>
            <p className="text-white lh-sm  m-0 py-1 p-xl-2">
              Costruisci la tua forza. Supera i tuoi limiti. Diventa la tua
              versione migliore.{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
