import { useNavigate } from "react-router-dom";
import TextButton from "./buttons/TextButton";
import OutlinedButton from "./buttons/OutlinedButton";
import Button from "./buttons/Button";
import Logo from "./Logo";
import { useAuth } from "../lib/AuthContext";


function Navbar() {

    const navigate = useNavigate()
    const { isLoggedIn, logout } = useAuth()

    return (
        <div className="flex px-4 md:px-8 justify-between w-full h-20">

            <Logo />

            <div className="flex items-center h-full">
                <ul className="flex items-center h-full w-max gap-3">
                    <li>
                        <TextButton onClick={() => navigate("/")}>Home</TextButton>
                    </li>
                    <li>
                        <TextButton onClick={() => navigate("/bookings")}>Bookings</TextButton>
                    </li>
                </ul>
            </div>

            {
                isLoggedIn ? (
                    <div className="flex gap-2 items-center justify-end">
                        <Button onClick={() => { logout() }}>
                            &nbsp;&nbsp;Log out&nbsp;&nbsp;
                        </Button>
                    </div>
                ) : (
                    <div className="flex gap-2 items-center justify-end">
                        <Button onClick={() => { navigate("/signup") }}>
                            &nbsp;&nbsp;Sign up&nbsp;&nbsp;
                        </Button>
                        <OutlinedButton onClick={() => { navigate("/login") }}>
                            &nbsp;&nbsp;Log in&nbsp;&nbsp;
                        </OutlinedButton>
                    </div>
                )
            }

        </div>
    )
}


export default Navbar;
