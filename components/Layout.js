import Footer from "./Footer";
import Head from 'next/head'
import NavBar from "./NavBar/NavBar";

const Layout = ({ children }) => {
  return (
    <div className="content">
      <NavBar />
      <div className="inner-content">
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default Layout;