import "../style/navStyle.scss"
import {NavLink} from "react-router-dom";
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
                <NavLink className={({isActive}) => `link${isActive ? ' active' : ''}`} to="/" end>Day</NavLink>
                <NavLink className={({isActive}) => `link${isActive ? ' active' : ''}`} to="/week">Week</NavLink>
                <NavLink className={({isActive}) => `link${isActive ? ' active' : ''}`} to="/month">Month</NavLink>
                <NavLink className={({isActive}) => `link${isActive ? ' active' : ''}`} to="/one-time">One-time</NavLink>
                <NavLink className={({isActive}) => `link${isActive ? ' active' : ''}`} to="/profile">Profile</NavLink>
            </div>
        </nav>
    );
}

export default Nav;