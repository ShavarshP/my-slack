import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Index from "../pages/chat";
import LogIn from "../pages/register/logIn";
import SignUp from "../pages/register/signUp";

export const useRoutes = (userId, verify) => {
  if (!userId.data) {
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
      <Route path="/chat/:id" exact>
        <Index
          user={userId.data}
          allUsers={userId.allDataFilter}
          verify={verify}
        />
      </Route>
      <Redirect to={"/chat/" + userId.data.owner} />
    </Switch>
  );
};
