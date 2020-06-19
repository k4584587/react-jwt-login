import React, {Component} from 'react';

class Profile extends Component {

    render() {

        const { currentUser } = this.props;

        return (
            <div className="profile">
                <h3>아이디 : {currentUser.username}</h3>
                <h3>이메일 : {currentUser.email}</h3>
                <h3>권한 : {currentUser.roles}</h3>
            </div>
        );
    }
}

export default Profile;