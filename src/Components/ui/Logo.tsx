import logo from "../../assets/logo.svg";

function Logo() {
  return (
    <header className="header">
      <div id="logo">
        <span className="h1">
          <img src={logo} alt="Logo supergalactic app" />
          <span id="app-title">SuperGalactic</span>
        </span>
        <p>Manager</p>
      </div>
    </header>
  );
}

export default Logo;
