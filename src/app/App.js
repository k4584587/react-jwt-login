import React from 'react';
import './App.css';
import {Route, Switch, withRouter} from 'react-router-dom';
import PrivateRoute from "../components/PrivateRoute";
import {Role} from "../components/Role";

import Navbar from "../components/Navbar";
import Home from '../views/Home'
import Admin from "../views/Admin";
import Login from "../views/Login";
import Register from "../views/Register";
import Profile from "../views/Profile";

import AuthService from "../service/AuthService";

import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentUser: null,
            role: null,
        };

        this.setLoginState = this.setLoginState.bind(this);
    }

    setLoginState(user, role) {
        this.setState({
            currentUser: user,
            role:role
        });
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser(); //사용자 정보 호출

        if(user) {
            this.setState({
                currentUser: user,
                role: user.roles
            });
        } else {
            console.log("로그인 정보 없음");
        }

    }

    render() {
        const { currentUser,role } = this.state;

        return (
            <div className="App">
                <Navbar currentUser={currentUser} role={role}  />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <PrivateRoute path="/admin" component={Admin} role={[[Role.Admin]]} />
                    <Route path="/login">
                        <Login  setLoginState={this.setLoginState} />
                    </Route>
                    <PrivateRoute path="/profile" component={Profile} role={[[Role.User, Role.Admin]]} />
                    <Route exact path="/singup" component={Register} />
                </Switch>
                <Alert stack={{limit: 3}}
                       timeout={3000}
                       position='top-right' effect='slide' offset={65}/>
            </div>
        );
    }
}

export default withRouter(App);
