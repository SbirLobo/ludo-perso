import PropTypes from "prop-types";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <div className="">
        <div className="h-screen bg-white flex justify-center">
          <div className="text-secondary w-[80%] pt-24">
            <main className="">{children}</main>
          </div>
        </div>
      </div>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
