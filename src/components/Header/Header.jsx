import "./Header.scss";
import title from "../../assets/images/quick_zip_title.png";

const Header = () => {
  return (
    <header className="header">
      <img className="logo" src={title} alt="QuickZip logo" />
    </header>
  );
};

export default Header;
