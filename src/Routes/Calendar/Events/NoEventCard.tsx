import EventIndicator from "./EventIndicator";

function NoEventCard() {
  return (
    <div className="event-card no-event">
      <div className="card-body">
        <h4 className="black">Aucun événement</h4>
        <div className="help">
          <span>Sélectionnez un date contenant</span>
          <span className="indicator-in-no-event">
            <EventIndicator source="calendar" /> un événement
          </span>
        </div>
      </div>
    </div>
  );
}

export default NoEventCard;
