import { useModalContext } from "../../context/ModalContext";
import AddEvent from "./Events/AddEvent";

type CalendarCellProps = {
  dayNumber: number;
  fullDate: Date;
};

function CalendarCell({ dayNumber, fullDate }: CalendarCellProps) {
  const { setBox } = useModalContext();

  const handleAddEvent = () => {
    setBox(<AddEvent date={fullDate} />);
  };

  return (
    <div className="day calendar-cell not-empty" onClick={handleAddEvent}>
      <p>{dayNumber}</p>
      <div className="events-indicators">
        <span className="has-event"></span>
        <span className="has-event"></span>
        <span className="has-event"></span>
      </div>
    </div>
  );
}

export default CalendarCell;
