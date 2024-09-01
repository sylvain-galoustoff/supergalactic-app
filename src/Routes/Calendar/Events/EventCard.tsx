import { useSelector } from "react-redux";
import { EventType } from "../../../models/event";
import { RootState } from "../../../redux/store";
import { IoTimeOutline } from "react-icons/io5";
import EventIndicator from "./EventIndicator";

type EventCardProps = {
  event: EventType;
};

function EventCard({ event }: EventCardProps) {
  const projects = useSelector((state: RootState) => state.projects);
  const currentProject = projects.find((project) => project.id === event.projectId);

  return (
    <div className="event-card">
      <div className="card-header">
        <EventIndicator source={event.taskId ? "task" : "calendar"} withLabel />
      </div>
      <div className="card-body">
        <div className="event-line">
          <h4 className="black">{event.eventName}</h4>
          <p className="event-time help black">
            <IoTimeOutline />
            {event.time}
          </p>
        </div>
        <p className="event-project-name">{currentProject?.projectName}</p>
      </div>
    </div>
  );
}

export default EventCard;
