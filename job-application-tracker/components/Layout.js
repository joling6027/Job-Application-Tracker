import Footer from "./Footer";
import Head from 'next/head'
import NavBar from "./NavBar";

const Layout = ({ children }) => {
  return (
    <div className="content">
      <NavBar />
        {children}
      <Footer />
    </div>
  );
}

export default Layout;