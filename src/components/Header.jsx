import { Link } from "react-router-dom";
import { Logo } from "../assets/Logo";
import './Header.css'

const Header = () => {
    return(
        <nav>
            <ul>
                <li>
                    <Link to="/"><Logo/>TaskMaster</Link>
                </li>
                <li>
                    <Link to="/board">Board</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Header