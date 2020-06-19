import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../service/AuthService";

import Alert from 'react-s-alert';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            loading: false,
            message: ""
        };

        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    async handleLogin(e) {
        e.preventDefault();

        this.setState({
            message: "",
            loading: true
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {

            await AuthService.login(this.state.username, this.state.password).then(() => { //로그인 성공

                const user = AuthService.getCurrentUser();
                this.props.setLoginState(user,user.roles);

                Alert.success("로그인 되었습니다.");
                this.props.history.push("/");

            }).catch(error => { //로그인 실패
                Alert.error("로그인 실패");
                this.props.history.push("/login");

                this.setState({
                    loading: false
                })

            })
        } else {
            this.setState({
                loading: false
            });
        }
    }

    render() {
        return (
            <div className="login">
                <h3>Login Page</h3> <br/>

                {/*Form tag Start*/}
                <Form
                    onSubmit={this.handleLogin}
                    ref={c => {
                        this.form = c;
                    }}
                >

                    <Input
                        type="text"
                        className="form-control"
                        name="username"
                        value={this.state.username}
                        onChange={this.onChangeUsername}
                    /> {/*username input*/}

                    <Input
                        type="password"
                        className="form-control"
                        name="password"
                        value={this.state.password}
                        onChange={this.onChangePassword}
                    /> {/*password input*/}

                    <br />
                    <button disabled={this.state.loading}>
                        {this.state.loading ? (
                            <span>로그인중...</span>
                        ) : (
                            <span>로그인</span>
                        )}
                    </button>

                    <CheckButton
                        style={{ display: "none" }}
                        ref={c => {
                            this.checkBtn = c;
                        }}
                    />

                </Form>
                {/*End Login Form*/}

            </div>
        );
    }
}

export default withRouter(Login);