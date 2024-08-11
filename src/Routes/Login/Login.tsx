import { FormEvent, useState } from "react";
import { IoLogInOutline, IoMailOutline, IoKeyOutline } from "react-icons/io5";
import { InputField, Button } from "simplegems";
import Logo from "../../Components/ui/Logo";
import { logUser } from "../../api/userApi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../redux/userSlice";
import { UserType } from "../../models/user";

function Login() {
  const emptyForm = {
    usermail: "",
    userpass: "",
  };

  const [form, setForm] = useState(emptyForm);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updateForm = (value: string, target: string) => {
    setForm((prevState) => ({
      ...prevState,
      [target]: value,
    }));
  };

  const submitLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await logUser(form.usermail, form.userpass);

    if (response.success) {
      const userPayload = response.payload as UserType;
      dispatch(setUser(userPayload));
      navigate("/");
    } else {
      console.error(response);
    }
  };

  return (
    <main id="login-page">
      <Logo />
      <div className="card" id="login-box">
        <h1 className="card-header black">Connexion</h1>
        <form onSubmit={submitLogin}>
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
