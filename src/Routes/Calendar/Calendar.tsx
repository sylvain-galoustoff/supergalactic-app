import { useState } from "react";
import PageHeader from "../../Components/ui/PageHeader/PageHeader";
import Toolbar from "../../Components/ui/Toolbar";
import CalendarGrid from "./CalendarGrid";
import { getTime } from "date-fns";

function Calendar() {
  const today = getTime(new Date().setHours(0, 0, 0, 0));
  const [selectedDate, setSelectedDate] = useState(
    getTime(new Date().setHours(0, 0, 0, 0))
  );

  return (
    <main id="calendar">
      <PageHeader title="Calendrier" />
      <Toolbar />
      <div className="zone content-zone" id="calendar-zone">
        <CalendarGrid
          selectedDate={selectedDate}
          today={today}
          changeSelectedDate={(date) => setSelectedDate(date)}
        />
      </div>
    </main>
  );
}

export default Calendar;
