import { DateContextProvider } from "../../../context/DateContext";
import DisplayDate from "./DisplayDate";
import DisplayTime from "./DisplayTime";
import UserMenu from "./UserMenu";

type PageHeaderProps = {
  title: string;
};

function PageHeader({ title }: PageHeaderProps) {
  return (
    <DateContextProvider>
      <div className="zone header" id="header-zone">
        <div className="header-part" id="header-left">
          <h2 className="black">{title}</h2>
        </div>
        <div className="header-part" id="header-right">
          <DisplayDate className="separator-right" id="current-date" />
          <DisplayTime className="separator-right" id="current-date" />
          <UserMenu />
        </div>
      </div>
    </DateContextProvider>
  );
}

export default PageHeader;
