import { format } from "date-fns";
import { useDateContext } from "../../../context/DateContext";

type DisplayTimeProps = {
  className: string;
  id: string;
};

function DisplayTime({ className, id }: DisplayTimeProps) {
  const { date } = useDateContext();

  return (
    <div className={className} id={id}>
      {date && format(date, "H:mm")}
    </div>
  );
}

export default DisplayTime;
