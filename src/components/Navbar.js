import React, {Component} from 'react';
import '../components/css/Navbar.css'
import {Link} from 'react-router-dom';
import AuthService from "../service/AuthService";

class Navbar extends Component {

    logOut() { //로그아웃
        AuthService.logout();

    }

    render() {

        const { currentUser,role } = this.props

        return (
            <div className="navbar">
                <ul>
                    <li><Link to="/">홈</Link></li>
                    {currentUser ?
                        <span>

                            {role.includes("ROLE_ADMIN") && (
                                <li><Link to="/admin">관리자</Link></li>
                            )}
                            <li><a href="/profile">{currentUser.username}님 환영합니다.</a></li>
                            <li><a href="/" onClick={this.logOut}>로그아웃</a></li>

                        </span>
                     :
                        <span>
                            <li><Link to="/login">로그인</Link></li>
                            <li><Link to="/singup">회원가입</Link></li>
                        </span>
                    }

                </ul>
            </div>
        );
    }
}

export default Navbar;