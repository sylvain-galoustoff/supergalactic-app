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
import { NavLink } from "react-router-dom";
import Logo from "./Logo";

function Sidebar() {
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
          <li>
            <NavLink className="button navlink" to="/prospection">
              <IoSearchOutline />
              Prospection
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
            <button className="navlink">
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
