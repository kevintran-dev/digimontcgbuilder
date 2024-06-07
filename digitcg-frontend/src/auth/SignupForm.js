import React, { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

// signup function passed down from App

function SignupForm({ signup }) {


    const history = useHistory();
    const [formData, setFormData] = useState(
        {
            username: "",
            password: ""
        }
    );
    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setFormData(data => ({ ...data, [name]: value }));
    }
    const handleSubmit = async (evt) => {
        evt.preventDefault();
        let res = await signup(formData);
        if (res.success) {
            history.push("/")
        }
        else {
            console.log(res.errors);

        }
    }

    return (
        <div className="SignupForm">
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input
                        name="username"
                        value={formData.username}
                        onChange={handleChange}></input>
                </div>
                <div>
                    <label>Password</label>
                    <input
                        name="password"
                        value={formData.password}
                        onChange={handleChange}></input>
                </div>
                <button>Sign Up!</button>
            </form>
        </div>
    )

}

export default SignupForm