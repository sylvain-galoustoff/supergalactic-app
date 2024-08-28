import EventIndicator from "./EventIndicator";

function NoEventCard() {
  return (
    <div className="event-card no-event">
      <div className="card-body">
        <h4 className="black">Aucun événement</h4>
        <p className="help">
          <span>Sélectionnez un date contenant</span>
          <EventIndicator />
          <span>un événement</span>
        </p>
      </div>
    </div>
  );
}

export default NoEventCard;
