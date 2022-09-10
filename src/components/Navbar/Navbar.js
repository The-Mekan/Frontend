import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { Button } from "@chakra-ui/react";
import { useAuth } from "../../contexts/AuthContext";

function Navbar() {
  const { loggendin,user } = useAuth();
  return (
    <div>
      <nav className={styles.nav}>
        <div className={styles.left}>
          <div className={styles.logo}>
            <Link to="/">Mekan</Link>
          </div>
          <ul className={styles.menu}>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </div>
        <div className={styles.right}>
          {!loggendin && (
            <>
              <Link to="/signin">
                <Button colorScheme="blue">Login</Button>
              </Link>
              <Link to="/signup">
                <Button colorScheme="blue">Register</Button>
              </Link>
            </>
          )}
          {loggendin && (
            <>
             
              {
                user?.role==="admin" &&(
                  <Link to="/admin">
                    <Button variant="ghost" colorScheme="pink">Admin</Button>
                  </Link>
                )
              }
              <Link to="/profile">
                <Button colorScheme="pink">Profile</Button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
