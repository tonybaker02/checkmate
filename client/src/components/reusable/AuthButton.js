import React from 'react'
import { useHistory } from "react-router-dom";
import Button from 'react-bootstrap/Button';

function AuthButton() {
    const history = useHistory();

    function returnToLogin(e) {
        e.preventDefault();
        history.push(
            {
                pathname: '/Login'
            })
    }
    return (
        <div>
            <Button variant="outline-success"
                onClick={(e) => returnToLogin(e)}
            >Login</Button>

        </div>
    )
}

export default AuthButton