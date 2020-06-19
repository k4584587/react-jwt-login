import React from 'react';
import './css/Home.css';
import {withRouter} from "react-router-dom";
import UserService from "../service/UserService";

class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            content: ""
        };
    }

    componentDidMount() {
        UserService.getPublicContent().then(res => {
            this.setState({
                content: res.data
            });
        }).catch(error => {
            this.setState({
                content: error
            });
        })

    }

    render() {
        return <h1>API Result, {this.state.content}</h1>;
    }
}

export default withRouter(Home);