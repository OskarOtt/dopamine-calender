import "../style/navStyle.scss"
import {NavLink} from "react-router-dom";
import { useGoals } from "../contexts/useGoalsHook";
import logo from "../assets/logo.jpg";

const Nav = () => {
    const { setShowModal } = useGoals();

    return (
        <nav className="nav-container">
            <div className="nav-logo">
                <NavLink to="/" end>
                    <img src={logo} alt={"logo"}/>
                </NavLink>
            </div>
            <div className="nav-link-container">
                <button className="add-goal-nav-button" onClick={() => setShowModal(true)}>Add Goal</button>
                <NavLink className={({isActive}) => `link${isActive ? ' active' : ''}`} to="/" end>Day</NavLink>
                <NavLink className={({isActive}) => `link${isActive ? ' active' : ''}`} to="/week">Week</NavLink>
                <NavLink className={({isActive}) => `link${isActive ? ' active' : ''}`} to="/month">Month</NavLink>
                <NavLink className={({isActive}) => `link${isActive ? ' active' : ''}`} to="/one-time">One-time</NavLink>
                <NavLink className={({isActive}) => `link${isActive ? ' active' : ''}`} to="/profile" title="Profile">
                    {({ isActive }) => isActive ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="8" r="4"/>
                            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                        </svg>
                    )}
                </NavLink>
            </div>
        </nav>
    );
}

export default Nav;