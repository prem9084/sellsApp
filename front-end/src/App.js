import Addsells from "./components/addsels/addsells";
import Top5sels from "./components/top_5_sells/to_5_sells";
import Revinue from "./components/Revinue/Revinue";

import Register from "./components/Register/Register";
import Login from "./components/Login/Login.js";
import UpdateFrom from "./components/Updateform/Updatefrom.js";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useAuth } from "./components/context/auth";
import toast from "react-hot-toast";
import AllProducts from "./components/AllSell/AllProducs.js";

function App() {
  const [auth, setAuth] = useAuth();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Succesfully");
  };

  return (
    <>
      <Router>
        <div className="App">
          <nav className="navbar navbar-expand-lg bg-primary ">
            <div className="container-fluid">
              <a className="navbar-brand ">SELLS APP</a>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse "
                id="navbarNavAltMarkup"
              >
                <div className="navbar-nav ">
                  {!auth?.user ? (
                    <>
                      <Link
                        to="/login"
                        className="nav-link text-light"
                        href="#"
                      >
                        LOGIN
                      </Link>
                      <Link
                        to="/register"
                        className="nav-link text-light"
                        href="#"
                      >
                        REGISTER
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/addsels"
                        className="nav-link active text-light"
                        aria-current="page"
                      >
                        ADD SELLS
                      </Link>
                      <Link to="/tosells" className="nav-link text-light">
                        TOP 5 SELLS
                      </Link>
                      <Link
                        to="/revinue"
                        className="nav-link text-light"
                        href="#"
                      >
                        TODAY TOTAL REVENUE
                      </Link>
                      <Link
                        to="/allproducs"
                        className="nav-link text-light"
                        href="#"
                      >
                        ALL PRODUCTS
                      </Link>

                      <Link
                        to="/login"
                        className="nav-link text-light"
                        href="#"
                        onClick={handleLogout}
                      >
                        LOGOUT
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </nav>
        </div>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/tosells" element={<Top5sels />}></Route>
          <Route path="/revinue" element={<Revinue />}></Route>
          <Route path="/allproducs" element={<AllProducts />}></Route>
          <Route path="/update-form/:id" element={<UpdateFrom />}></Route>
          <Route path="/addsels" element={<Addsells />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
