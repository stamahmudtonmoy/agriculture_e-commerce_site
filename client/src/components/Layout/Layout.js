import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";

/**
 * Layout component for rendering the common layout structure of the application.
 *
 * @param {Object} props - Component props.
 * @param {string} props.title - The title of the page.
 * @param {string} props.description - The description of the page.
 * @param {string} props.keywords - The keywords related to the page.
 * @param {string} props.author - The author of the page.
 * @param {JSX.Element} props.children - The child components to render within the layout.
 *
 * @returns {JSX.Element} A React component that defines the common layout structure.
 */
const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "70vh" }}>
        <Toaster />
        {children}
      </main>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "Grow Bangla - shop now",
  description: "mern stack project",
  keywords: "mern,react,node,mongodb",
  author: "Nahin",
};

export default Layout;
