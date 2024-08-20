import { differenceInDays } from "date-fns";
import { useEffect, useState } from "react";

export type TaskDeadlineProps = {
  deadline: number | null;
};

function TaskDeadline({ deadline }: TaskDeadlineProps) {
  const [difference, setDifference] = useState(0);
  const [emergency, setEmergency] = useState<"success" | "warning" | "danger">("success");

  useEffect(() => {
    if (deadline) {
      const daysLeft = differenceInDays(new Date(deadline), Date.now());
      setDifference(daysLeft);

      const emergencyStatus = () => {
        if (daysLeft <= 0) {
          return "danger";
        } else if (daysLeft <= 10) {
          return "warning";
        } else if (daysLeft >= 11) {
          return "success";
        } else {
          return "success";
        }
      };

      setEmergency(emergencyStatus());
    }
  }, [deadline]);

  return (
    <p className={`task-deadline help black ${emergency}`}>Reste {difference} jours</p>
  );
}

export default TaskDeadline;
