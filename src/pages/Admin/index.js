import React from "react";
import './styles.css';
import {Link,Route,Switch,useRouteMatch} from 'react-router-dom';
import {Box} from  "@chakra-ui/react";
import Home from "./Home";

function Admin() {
  const {path,url}=useRouteMatch();
  return (
    <div>
      <nav>
        <ul className="admin-menu">
          <li>
              <Link to={url}>Home</Link>
          </li>
        
        </ul>
      </nav>
      <Box mt="10">
        <Switch>
          <Route exact path={path} component={Home}/>
         
        </Switch>
      </Box>

    </div>
  );
}

export default Admin;
