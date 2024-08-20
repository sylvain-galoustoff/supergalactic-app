export type TaskDeadlineProps = {
  deadline: number | null;
};

function TaskDeadline({ deadline }: TaskDeadlineProps) {
  console.log(deadline);

  return <p className="task-deadline help danger">Dans 4 jours</p>;
}

export default TaskDeadline;
