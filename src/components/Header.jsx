import { LogOut } from "react-feather";
import { useAuth } from "../context/AuthContext";


export default function Header() {
    const { user, handleLogOut } = useAuth();

    return (
        <div id="header--wrapper">
            {user ? (
                <>
                    Welcome {user?.name}
                    <LogOut onClick={handleLogOut} className="header--link" />
                </>
            ) : (
                    <button>Login</button>
            )}
        </div>
    )
}