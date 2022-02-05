import axios from "axios";
import { useState } from "react";
import { useAuth } from "../contexts/auth";
import {
    useNavigate,
    useLocation,
    Navigate,
} from "react-router-dom";

export function RequireAuth({ children }) {
    let auth = useAuth();
    let location = useLocation();

    if (!auth.user) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}

export const Login = () => {
    let auth = useAuth();
    let location = useLocation();
    let navigate = useNavigate();
    let from = location.state?.from?.pathname || "/";
    const [credentials, setCredentials] = useState({ username: "", password: "" });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCredentials((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { password, username } = credentials;
        if (!username || !password) {
            return;
        }
        const encodedData = "Basic " + window.btoa(`${username}:${password}`);
        try {
            const { data } = await axios.post("/login", {}, {
                headers: {
                    Authorization: encodedData
                },
            });
            if (data?.skey) {
                auth.signin(username, () => {
                    localStorage.setItem("user", JSON.stringify({ skey: data.skey, user: username }));
                    // Send them back to the page they tried to visit when they were
                    // redirected to the login page. Use { replace: true } so we don't create
                    // another entry in the history stack for the login page.  This means that
                    // when they get to the protected page and click the back button, they
                    // won't end up back on the login page, which is also really nice for the
                    // user experience.
                    navigate(from, { replace: true });
                });
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form>
            <div>
                <input type="text" placeholder="Username" name="username" onChange={handleChange} />
            </div>
            <div>
                <input type="password" placeholder="Password" name="password" onChange={handleChange} />
            </div>
            <div>
                <button type="submit" onClick={handleSubmit}>Login</button>
            </div>
        </form>
    )
};