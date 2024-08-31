type EventIndicatorProps = {
  source: "calendar" | "task";
};

function EventIndicator({ source }: EventIndicatorProps) {
  return <span className={`has-event ${source}`} />;
}

export default EventIndicator;
