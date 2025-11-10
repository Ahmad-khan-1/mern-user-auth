import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";

function Home() {
  const [loggedInUser, setLoggedInUser] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  const handleLogout = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("User logged out");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const fetchProducts = async () => {
    try {
      const url = "http://localhost:8080/products";
      const headers = {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };

      const response = await fetch(url, headers);
      const result = await response.json;
      console.log(result);
      setProducts(result);
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="home-container">
      <h1>Welcome {loggedInUser}</h1>
      <button onClick={handleLogout}>Logout</button>
      <div>
        {Array.isArray(products) && products.length > 0 ? (
          products.map((item, index) => (
            <ul key={index}>
              <li>
                {item.name} : {item.price}
              </li>
            </ul>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default Home;
