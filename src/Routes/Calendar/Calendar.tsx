import { useState } from "react";
import { IoCalendarNumberOutline } from "react-icons/io5";
import PageHeader from "../../Components/ui/PageHeader/PageHeader";
import Toolbar from "../../Components/ui/Toolbar";
import CalendarGrid from "./CalendarGrid";
import { getTime } from "date-fns";
import Events from "./Events/Events";
import AddEvent from "./Events/AddEvent";
import ModalButton from "../../Components/ui/Modals/ModalButton";

function Calendar() {
  const today = getTime(new Date().setHours(0, 0, 0, 0));
  const [selectedDate, setSelectedDate] = useState(
    getTime(new Date().setHours(0, 0, 0, 0))
  );

  return (
    <main id="calendar">
      <PageHeader title="Calendrier" />
      <Toolbar
        right={
          <ModalButton
            icon={<IoCalendarNumberOutline />}
            label="Ajouter un événement"
            modal={<AddEvent selectedDate={selectedDate} />}
          />
        }
      />
      <div className="zone content-zone" id="calendar-zone">
        <CalendarGrid
          selectedDate={selectedDate}
          today={today}
          changeSelectedDate={(date) => setSelectedDate(date)}
        />
        <Events selectedDate={selectedDate} />
      </div>
    </main>
  );
}

export default Calendar;
