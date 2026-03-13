import {formatedDate, getWeekNumber} from "../helpers/helpers.ts";
import "../style/DayPageHeader.scss";

interface props {
    title: string,
    selectedDate?: Date,
    onPrev?: () => void,
    onNext?: () => void,
}

const WeekPageHeader = ({title, selectedDate, onPrev, onNext}: props) => {
    const date = selectedDate || new Date();
    const weekNr = getWeekNumber(date);

    return (
        <div className="page-heade-container">
            <div className="page-header">
                <div>
                    <p>{formatedDate(date)}</p>
                </div>
                <div className="header-center">
                    {onPrev && <button onClick={onPrev} className="nav-button">&larr;</button>}
                    <h1>{title}</h1>
                    {onNext && <button onClick={onNext} className="nav-button">&rarr;</button>}
                </div>
                <div>
                    <p>Week {weekNr}</p>
                </div>
            </div>
        </div>
    );
}

export default WeekPageHeader;
