import { IoEllipse, IoArrowForwardOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

function TaskCard() {
  return (
    <div className="task-card">
      <h4 className="task-header">
        <IoEllipse className="priority-icon primary" /> Titre de la tâche
      </h4>
      <div className="task-body">
        <p className="task-description">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Natus explicabo
          exercitationem animi at sapiente quae, nihil iure, placeat dignissimos nostrum
          ipsa ullam id temporibus fugiat! Dolore doloremque eius fugiat maiores!
        </p>
        <p className="task-deadline help danger">Dans 4 jours</p>
      </div>
      <div className="task-footer">
        <Link to="/task/1">
          Détails <IoArrowForwardOutline />
        </Link>
      </div>
    </div>
  );
}

export default TaskCard;
