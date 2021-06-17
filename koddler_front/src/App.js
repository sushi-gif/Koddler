import { useEffect, useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Sidebar } from "./components";
import Settings from "./components/Settings/Settings";
import GloablStyle, { Container } from "./gloablStyles";
import Help from "./pages/Help";
import Home from "./pages/Home";
import Orders from "./pages/Orders";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import axios from "axios";
import ProtectedRoute from "./components/Auth/ProtectedRoute";

function App() {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    axios
      .post("/koddler-rest/api/authorization/isLogged.php", {
        withCredentials: true,
      })
      .then((response) => {
        setIsLogged(response.data.logged);
      })
      .catch((error) => {});
  }, []);

  return (
    <>
      <GloablStyle />
      <Sidebar isLogged={isLogged} />
      <Switch>
        <Container>
          <Route path="/dashboard" component={Home} />
          <ProtectedRoute
            path="/orders"
            component={Orders}
            isAuth={isLogged}
            redirectPath="/signin"
          />
          <Route path="/help" component={Help} />
          <ProtectedRoute
            path="/profile"
            component={Settings}
            isAuth={isLogged}
            redirectPath="/signin"
          />
          <ProtectedRoute
            path="/signin"
            component={SignIn}
            isAuth={!isLogged}
            redirectPath="/dashboard"
          />
          <ProtectedRoute
            path="/signup"
            component={SignUp}
            isAuth={!isLogged}
            redirectPath="/dashboard"
          />
          <Redirect from="*" to="/dashboard" />
        </Container>
      </Switch>
    </>
  );
}

export default App;
