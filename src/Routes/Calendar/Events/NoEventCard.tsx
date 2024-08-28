function NoEventCard() {
  return (
    <div className="event-card no-event">
      <div className="card-body">
        <h4 className="black">Aucun événement à afficher</h4>
        <p className="help">Sélectionnez un date contenant au moins un événement</p>
      </div>
    </div>
  );
}

export default NoEventCard;
