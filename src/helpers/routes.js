import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Index from "../pages/chat";
import LogIn from "../pages/register/logIn";
import SignUp from "../pages/register/signUp";

export const useRoutes = (userId, verify) => {
  if (!userId) {
    return (
      <Switch>
        <Route path="/login" exact>
          <LogIn verify={verify} />
        </Route>
        <Route path="/signup" exact>
          <SignUp verify={verify} />
        </Route>
        <Redirect to="/login" />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/chat" exact>
        <Index />
      </Route>
      <Redirect to="/chat" />
    </Switch>
  );
};
