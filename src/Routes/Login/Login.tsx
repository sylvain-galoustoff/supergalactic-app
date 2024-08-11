import { useState } from "react";
import { IoLogInOutline, IoMailOutline, IoKeyOutline } from "react-icons/io5";
import { InputField, Button } from "simplegems";
import Logo from "../../Components/ui/Logo";

function Login() {
  const emptyForm = {
    usermail: "",
    userpass: "",
  };

  const [form, setForm] = useState(emptyForm);

  const updateForm = (value: string, target: string) => {
    setForm((prevState) => ({
      ...prevState,
      [target]: value,
    }));
  };

  return (
    <main id="login-page">
      <Logo />
      <div className="card" id="login-box">
        <h1 className="card-header black">Connexion</h1>
        <form>
          <div className="card-content" id="box-content">
            <InputField
              id="usermail"
              label="Email"
              iconBefore={<IoMailOutline />}
              onChange={(value) => updateForm(value, "usermail")}
            />
            <InputField
              id="userpass"
              type="password"
              label="Mot de passe"
              iconBefore={<IoKeyOutline />}
              onChange={(value) => updateForm(value, "userpass")}
            />
          </div>
          <div className="card-footer button-group">
            <Button
              type="submit"
              variant="primary"
              iconBefore={<IoLogInOutline />}
              label="Connexion"
            />
          </div>
        </form>
      </div>
    </main>
  );
}

export default Login;
