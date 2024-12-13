import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer text-center py-10">
      <Link to="/" className="text-2xl font-bold italic text-gray-700">
        Find <span className="text-rose-600">Recipe</span>
      </Link>
      <p>&copy; {new Date().getFullYear()} Find Racipe. All Right Reserved.</p>
    </footer>
  );
};

export default Footer;
