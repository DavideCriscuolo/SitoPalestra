import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import "./../css/Footer.scss";

export default function Footer() {
  return (
    <footer>
      <div className=" my-3 social d-flex justify-content-center align-items-center gap-3">
        <h6 className="m-0">Seguici su i social</h6>
        <Link to={"https://www.instagram.com/vitocriscuolopalasp/"}>
          <FontAwesomeIcon
            icon={faInstagram}
            className="fa-brands fa-instagram"
            size="xl"
          ></FontAwesomeIcon>
        </Link>
        <Link
          to={"https://www.facebook.com/p/Palasportmax-Eboli-100054624541607/"}
        >
          <FontAwesomeIcon
            icon={faFacebook}
            className="fa-brands fa-facebook"
            size="xl"
          ></FontAwesomeIcon>{" "}
        </Link>
      </div>
      <p className=" text-center fst-italic">Developed by Davide Criscuolo.</p>
    </footer>
  );
}
