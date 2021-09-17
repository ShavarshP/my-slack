import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import LogIn from "../pages/register/logIn";
import SignUp from "../pages/register/signUp";

export const useRoutes = (props) => {
  if (true) {
    return (
      <Switch>
        <Route path="/login" exact>
          <LogIn />
        </Route>
        <Route path="/signup" exact>
          <SignUp />
        </Route>
        <Redirect to="/login" />
      </Switch>
    );
  }

  // return (
  //   <Switch>
  //     <Route path="/home" exact>
  //       <Home />
  //     </Route>
  //     <Route path="/movie/:id" exact>
  //       <Movie />
  //     </Route>
  //     <Redirect to="/home" />
  //   </Switch>
  // );
};
