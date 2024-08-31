type EventIndicatorProps = {
  source: "calendar" | "task";
  withLabel?: boolean;
};

function EventIndicator({ source, withLabel = false }: EventIndicatorProps) {
  const renderLabel = () => {
    switch (source) {
      case "calendar":
        return "Evenement";
      case "task":
        return "Tâche";
      default:
        return "Evenement";
    }
  };

  return (
    <p className="event-indicator">
      <span className={`event-indicator-icon ${source}`} />
      {withLabel && renderLabel()}
    </p>
  );
}

export default EventIndicator;
