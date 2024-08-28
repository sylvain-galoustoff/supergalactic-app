import { useSelector } from "react-redux";
import { EventType } from "../../../models/event";
import { RootState } from "../../../redux/store";
import { IoTimeOutline } from "react-icons/io5";

type EventCardProps = {
  event: EventType;
};

function EventCard({ event }: EventCardProps) {
  const projects = useSelector((state: RootState) => state.projects);
  const currentProject = projects.find((project) => project.id === event.projectId);

  return (
    <div className="event-card">
      <div className="card-header">
        <p className="event-time help black">
          <IoTimeOutline />
          {event.time}
        </p>
      </div>
      <div className="card-body">
        <h4 className="black">{event.eventName}</h4>
        <p className="event-project-name">{currentProject?.projectName}</p>
      </div>
    </div>
  );
}

export default EventCard;
