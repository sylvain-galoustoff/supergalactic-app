import { IoLogInOutline } from "react-icons/io5";
import Logo from "../../Components/ui/Logo";

function Login() {
  return (
    <main id="login-page">
      <Logo />
      <div className="card" id="login-box">
        <h1 className="card-header black">Connexion</h1>
        <form>
          <div className="card-content" id="box-content">
            <div className="form-group">
              <label htmlFor="usermail">Email</label>
              <input type="text" id="usermail" />
            </div>
            <div className="form-group">
              <label htmlFor="userpass">Mot de passe</label>
              <input type="password" id="userpass" />
            </div>
          </div>
          <div className="card-footer button-group">
            <button type="submit" className="primary">
              <IoLogInOutline />
              Connexion
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Login;
