import React, { useState } from "react"
import { useHistory } from "react-router-dom"

const LoginForm = ({ login }) => {

    const history = useHistory()
    const [formErrors, setFormErrors] = useState([]);

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setFormData(login => ({ ...login, [name]: value }))
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault()
        let res = await login(formData);
        if (res.success) {
            history.push("/")
        }
        else {
            setFormErrors(res.errors);

        }
    }


    return (
        <div className="LoginForm">
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button onSubmit={handleSubmit}>Submit!</button>
            </form>
        </div>
    )
}

export default LoginForm