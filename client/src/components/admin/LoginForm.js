import React from "react"

const LoginForm = props => {
    const { username, password, handleChange, handleSubmit } = props
    return(
        <form onSubmit={handleSubmit}>
            <input 
                type="text"
                name="username"
                value={username}
                onChange={handleChange}
                placeholder="Username"/>
            <input
                tyoe="text"
                name="password"
                value={password}
                onChange={handleChange}
                placeholder="Password"/>
            <button>Login</button>
        </form>
    )
}

export default LoginForm