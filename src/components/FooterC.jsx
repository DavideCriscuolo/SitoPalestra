import { Link } from "react-router-dom";
import "./../css/Footer.css";

export default function Footer() {
  return (
    <footer>
      <div className=" my-3 social d-flex justify-content-center align-items-center gap-3">
        <h6 className="m-0">Seguici su i social</h6>
        <Link to={"https://www.instagram.com/vitocriscuolopalasp/"}>
          <i className="fa-brands fa-instagram"></i>
        </Link>
        <Link
          to={"https://www.facebook.com/p/Palasportmax-Eboli-100054624541607/"}
        >
          <i className="fa-brands fa-facebook"></i>{" "}
        </Link>
      </div>
      <p className=" text-center fst-italic">Developed by Davide Criscuolo.</p>
    </footer>
  );
}
