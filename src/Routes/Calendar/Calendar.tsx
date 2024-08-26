import { Select, InputField } from "simplegems";
import PageHeader from "../../Components/ui/PageHeader/PageHeader";
import Toolbar from "../../Components/ui/Toolbar";

function Calendar() {
  const monthSelectOption = [
    {
      label: "janvier",
      value: "janvier",
    },
  ];

  return (
    <main id="calendar">
      <PageHeader title="Calendrier" />
      <Toolbar />
      <div className="zone content-zone" id="calendar-zone">
        <div id="grid">
          <div id="grid-month-selection">
            <div className="calendar-cell" id="month">
              <Select data={monthSelectOption} id="month-selector" />
            </div>
            <div className="calendar-cell" id="year">
              <InputField id="year-input" type="text" value="2024" />
            </div>
          </div>
          <div id="weekdays">
            <div className="weekday calendar-cell">Lun</div>
            <div className="weekday calendar-cell">Mar</div>
            <div className="weekday calendar-cell">Mer</div>
            <div className="weekday calendar-cell">Jeu</div>
            <div className="weekday calendar-cell">Ven</div>
            <div className="weekday calendar-cell">Sam</div>
            <div className="weekday calendar-cell">Dim</div>
          </div>
          <div id="days">
            <div className="day calendar-cell">1</div>
            <div className="day calendar-cell">2</div>
            <div className="day calendar-cell">3</div>
            <div className="day calendar-cell">4</div>
            <div className="day calendar-cell">5</div>
            <div className="day calendar-cell">6</div>
            <div className="day calendar-cell">7</div>
            <div className="day calendar-cell">8</div>
            <div className="day calendar-cell">9</div>
            <div className="day calendar-cell">10</div>
            <div className="day calendar-cell">11</div>
            <div className="day calendar-cell">12</div>
            <div className="day calendar-cell">13</div>
            <div className="day calendar-cell">14</div>
            <div className="day calendar-cell">15</div>
            <div className="day calendar-cell">16</div>
            <div className="day calendar-cell">17</div>
            <div className="day calendar-cell">18</div>
            <div className="day calendar-cell">19</div>
            <div className="day calendar-cell">20</div>
            <div className="day calendar-cell">21</div>
            <div className="day calendar-cell">22</div>
            <div className="day calendar-cell">23</div>
            <div className="day calendar-cell">24</div>
            <div className="day calendar-cell">25</div>
            <div className="day calendar-cell">26</div>
            <div className="day calendar-cell">27</div>
            <div className="day calendar-cell">28</div>
            <div className="day calendar-cell">29</div>
            <div className="day calendar-cell">30</div>
            <div className="day calendar-cell">31</div>
            <div className="day calendar-cell" />
            <div className="day calendar-cell" />
            <div className="day calendar-cell" />
            <div className="day calendar-cell" />
          </div>
        </div>
        <div id="events"></div>
      </div>
    </main>
  );
}

export default Calendar;
