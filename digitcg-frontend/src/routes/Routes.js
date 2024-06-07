import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import HomePage from '../pages/HomePage';
import BuildDeck from '../pages/BuildDeck';
import PrivateRoute from './PrivateRoute';
import SignupForm from '../auth/SignupForm';
import LoginForm from '../auth/LoginForm';
const Routes = ({ signup, login }) => {
    return (
        <div>
            <Switch>
                <Route exact path="/">
                    <HomePage />
                </Route>

                <Route exact path="/signup">
                    <SignupForm signup={signup} />
                </Route>
                <Route exact path="/login">
                    <LoginForm login={login} />
                </Route>
                <Route exact path="/logout">
                </Route>
                <PrivateRoute exact path="/build">
                    <BuildDeck />
                </PrivateRoute>
                <Redirect to="/" />
            </Switch>
        </div>
    )
}

export default Routes