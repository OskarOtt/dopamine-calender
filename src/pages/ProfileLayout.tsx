import { NavLink, Outlet } from "react-router-dom";
import "../style/Profile.scss";

const ProfileLayout = () => {
    return (
        <div className="profile-layout">
            <nav className="profile-subnav">
                <NavLink
                    className={({ isActive }) => `profile-subnav-link${isActive ? " active" : ""}`}
                    to="/profile"
                    end
                >
                    Statistics

                </NavLink>
                <NavLink
                    className={({ isActive }) => `profile-subnav-link${isActive ? " active" : ""}`}
                    to="/profile/manage-goals"
                >
                    Manage Goals
                </NavLink>
            </nav>
            <Outlet />
        </div>
    );
};

export default ProfileLayout;
