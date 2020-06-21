import axios from "axios";

import { API_BASE_URL } from '../config/APIConfig';

//import  Cookie  from  'js-cookie';

class AuthService {

    async login(username, password) { //로그인 함수

        return axios
            .post(API_BASE_URL + "auth/signin", {
                username,
                password
            }, {
                withCredentials: true,
                xsrfCookieName: "XSRF-TOKEN",
                xsrfHeaderName: "X-XSRF-TOKEN",
                headers: {
                    'Access-Control-Allow-Origin' : '*',
                    'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                }
            }).then(res => {
                localStorage.setItem("user", JSON.stringify(res.data)); //로그인 정보를 세션에 저장
                return res.data;
            }).catch(error => {
                console.log(error.toString())
            })
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }

    logout() {
        localStorage.removeItem("user");
    }

} /*End Class*/

export default new AuthService();