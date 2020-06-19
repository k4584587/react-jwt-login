import React, {Component} from 'react';

import Form from "react-validation/build/form";

class Register extends Component {

    render() {
        return (
            <div className="singup">
                <h1>Register</h1>

                <Form
                    onSubmit=""
                    ref={c => {
                        this.form = c;
                    }}
                >


                </Form>

            </div>
        );
    }
}

export default Register;