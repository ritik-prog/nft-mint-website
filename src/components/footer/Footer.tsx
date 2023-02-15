import Data from "../../source/data.json";

function Footer() {
  return (
    <footer className="footer">
      <p>Copyright&copy;2023 by {Data.copyright}</p>
    </footer>
  );
}

export default Footer;
