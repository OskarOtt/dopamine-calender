import "../style/navStyle.scss"
import {Link} from "react-router-dom";
import { useGoals } from "../contexts/GoalsContext.tsx";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import logo from "../assets/logo.jpg";

const Nav = () => {
    const { setShowModal } = useGoals();

    return (
        <nav className="nav-container">
            <div className="nav-logo">
                <img src={logo} alt={"logo"}/>
            </div>
            <div className="nav-link-container">
                <button className="add-goal-nav-button" onClick={() => setShowModal(true)}>Add Goal</button>
                <Link className="link" to="/">Day</Link>
                <Link className="link" to="/week">Week</Link>
                <Link className="link" to="/month">Month</Link>
                <Link className="link" to="/profile">Profile</Link>
            </div>
        </nav>
    );
}

export default Nav;