import { format } from "date-fns";
import { useDateContext } from "../../../context/DateContext";

type DisplayDateProps = {
  className: string;
  id: string;
};

function DisplayDate({ className, id }: DisplayDateProps) {
  const { date } = useDateContext();

  return (
    <div className={className} id={id}>
      {date && format(date, "EEEE do MMMM yyyy")}
    </div>
  );
}

export default DisplayDate;
