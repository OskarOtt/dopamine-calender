import { useGoals } from "../contexts/GoalsContext.tsx";
import { GoalModel } from "../models/GoalModel.ts";
import GoalCheckbox from "../components/GoalCheckbox.tsx";
import PageHeader from "../components/PageHeader.tsx";
import "../style/OneTimeGoalsView.scss";

const formatDate = (date: Date) => date.toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });

const isChecked = (goal: GoalModel) => {
    if (!goal.specificDate) return false;
    return goal.checkedDates.some(d => d.toDateString() === goal.specificDate!.toDateString());
};

const OneTimeGoalsView = () => {
    const { goals, setGoals } = useGoals();

    const oneTimeGoals = goals.filter(g => !g.isRecurring && g.specificDate);

    const pending = oneTimeGoals
        .filter(g => !isChecked(g))
        .sort((a, b) => a.specificDate!.getTime() - b.specificDate!.getTime());

    const completed = oneTimeGoals
        .filter(g => isChecked(g))
        .sort((a, b) => a.specificDate!.getTime() - b.specificDate!.getTime());

    const handleToggle = (goal: GoalModel) => {
        const updatedGoals = goals.map(g => {
            if (g.id !== goal.id) return g;
            const dateStr = g.specificDate!.toDateString();
            const hasDate = g.checkedDates.some(d => d.toDateString() === dateStr);
            const newCheckedDates = hasDate
                ? g.checkedDates.filter(d => d.toDateString() !== dateStr)
                : [...g.checkedDates, g.specificDate!];
            return { ...g, checkedDates: newCheckedDates };
        });
        setGoals(updatedGoals);
        import("../helpers/localStorageHelpers.ts").then(({ saveGoals }) => saveGoals(updatedGoals));
    };

    const isOverdue = (goal: GoalModel) => goal.specificDate! < new Date() && !isChecked(goal);

    return (
        <div className="one-time-view-container">
            <PageHeader title="One-time Goals" selectedDate={new Date()} rightContent="" />

            <section className="one-time-section">
                <h2 className="section-title">Upcoming</h2>
                {pending.length === 0 && <p className="empty-message">No upcoming one-time goals.</p>}
                {pending.map(goal => (
                    <div
                        key={goal.id}
                        className={`one-time-goal-item ${isOverdue(goal) ? 'overdue' : ''}`}
                        onClick={() => handleToggle(goal)}
                    >
                        <div className="one-time-goal-left">
                            <span className="goal-icon">{goal.icon}</span>
                            <div className="one-time-goal-info">
                                <span className="goal-title">{goal.title}</span>
                                {goal.description && <span className="goal-desc">{goal.description}</span>}
                                <span className="goal-date">{formatDate(goal.specificDate!)}</span>
                            </div>
                        </div>
                        <GoalCheckbox checked={false} onChange={() => handleToggle(goal)} />
                    </div>
                ))}
            </section>

            {completed.length > 0 && (
                <section className="one-time-section completed-section">
                    <h2 className="section-title">Completed</h2>
                    {completed.map(goal => (
                        <div
                            key={goal.id}
                            className="one-time-goal-item done"
                            onClick={() => handleToggle(goal)}
                        >
                            <div className="one-time-goal-left">
                                <span className="goal-icon">{goal.icon}</span>
                                <div className="one-time-goal-info">
                                    <span className="goal-title">{goal.title}</span>
                                    {goal.description && <span className="goal-desc">{goal.description}</span>}
                                    <span className="goal-date">{formatDate(goal.specificDate!)}</span>
                                </div>
                            </div>
                            <GoalCheckbox checked={true} onChange={() => handleToggle(goal)} />
                        </div>
                    ))}
                </section>
            )}
        </div>
    );
};

export default OneTimeGoalsView;
