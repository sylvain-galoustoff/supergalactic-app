import {
  IoSpeedometerOutline,
  IoPeopleOutline,
  IoSparklesOutline,
  IoListOutline,
  IoCalendarOutline,
  IoSearchOutline,
  IoPowerOutline,
  IoInformationCircleOutline,
} from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";
import { useToast } from "simplegems";

function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sendToast = useToast();

  const userLogOut = async () => {
    signOut(auth).then(() => {
      dispatch(
        setUser({
          uid: "",
          email: "",
          displayName: "",
        })
      );
      navigate("/login");
      sendToast("warning", "Vous êtes déconnecté.");
    });
  };

  return (
    <aside>
      <Logo />
      <nav>
        <ul>
          <li>
            <NavLink className="button navlink" to="/">
              <IoSpeedometerOutline />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink className="button navlink" to="/clients">
              <IoPeopleOutline />
              Clients
            </NavLink>
          </li>
          <li>
            <NavLink className="button navlink" to="/projets">
              <IoSparklesOutline />
              Projets
            </NavLink>
          </li>
          <li>
            <NavLink className="button navlink" to="/taches">
              <IoListOutline />
              Tâches
            </NavLink>
          </li>
          <li>
            <NavLink className="button navlink" to="/calendrier">
              <IoCalendarOutline />
              Calendrier
            </NavLink>
          </li>
        </ul>
      </nav>
      <div id="user-menu">
        <ul>
          <li>
            <NavLink className="button navlink" to="/profil">
              <IoInformationCircleOutline />
              Profil
            </NavLink>
          </li>
          <li>
            <button className="navlink" onClick={userLogOut}>
              <IoPowerOutline />
              Déconnexion
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
