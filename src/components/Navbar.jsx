import logo from "../log.png";

export const Navbar = () => {
  return (
    <div className="navbar">
      <img src={logo} alt="" style={{ width: 100, height: 100 }} />
      <span>WhalePySocial</span>
    </div>
  );
};
