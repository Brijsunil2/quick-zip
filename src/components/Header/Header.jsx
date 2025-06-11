import "./Header.scss";
import title from "../../assets/images/quick_zip_title.png";

const Header = () => {
  return (
    <header>
      <img src={title} alt="QuickZip logo" />
    </header>
  );
};

export default Header;
