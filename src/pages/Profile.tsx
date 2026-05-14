import { useGoals } from "../contexts/useGoalsHook";
import { dayNames, formatedDate } from "../helpers/helpers.ts";
import "../style/Profile.scss";

const Profile = () => {
    const { goals, setGoals } = useGoals();

    const handleDeleteGoal = (goalId: string) => {
        const updatedGoals = goals.filter(g => g.id !== goalId);
        setGoals(updatedGoals);
        // Save to localStorage
        import("../helpers/localStorageHelpers.ts").then(({ saveGoals }) => saveGoals(updatedGoals));
    };

    const handleDeleteAll = () => {
        if (window.confirm("Are you sure you want to delete all goals? This action cannot be undone.")) {
            setGoals([]);
            // Save to localStorage
            import("../helpers/localStorageHelpers.ts").then(({ saveGoals }) => saveGoals([]));
        }
    };

    return (
        <div className="profile-container">
            <h1>Profile - Manage Goals</h1>
            <button onClick={handleDeleteAll} className="delete-all-button">Delete All Goals</button>
            <div className="goals-list">
                {goals.map(goal => (
                    <div key={goal.id} className="goal-item">
                        <div className="goal-info">
                            <h3>{goal.title}</h3>
                            {goal.description && <p>{goal.description}</p>}
                            <p><strong>Days:</strong> {goal.day.map(d => dayNames[d]).join(', ')}</p>
                            <p><strong>Created:</strong> {formatedDate(goal.date)}</p>
                        </div>
                        <button onClick={() => handleDeleteGoal(goal.id)} className="delete-button">Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Profile;
