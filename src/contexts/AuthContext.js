import { useState, useContext, createContext, useEffect } from "react";
import { fecthLogout, fecthMe } from "../api";
import { Flex,Spinner } from "@chakra-ui/react";
import Cookies from "js-cookie";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loggendin, setLoggendin] = useState(false);
  const [Loading, setLoading] = useState(true);

  const login = (data) => {
    setLoggendin(true);
    setUser(data.user);
    console.log(data);
    Cookies.set("access-token", data.accessToken);
    Cookies.set("refresh-token", data.refreshToken);
   
  };

  const logOut=async(callback)=>{
      setLoggendin(false);
      setUser(null);
      await fecthLogout();
      Cookies.remove("access-token");
      Cookies.remove("refresh-token");

      //localStorage.removeItem("access-token");
      //localStorage.removeItem("refresh-token");
      callback()
  }

  useEffect(() => {
    (async () => {
        try {
            const me =await fecthMe();
            console.log(me);
            setLoggendin(true);
            setUser(me);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
       

    })();
  }, []);

  const values = {
    loggendin,
    user,
    login,
    logOut,
  };
  if(Loading){
      return(
          <Flex justifyContent="center" alignItems="center" height="100vh">
              <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" size="xl" color="red.500"/>
          </Flex>
      )
  }
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
const useAuth = () => useContext(AuthContext);
export { AuthProvider, useAuth };
