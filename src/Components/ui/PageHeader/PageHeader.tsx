import UserMenu from "./UserMenu";

type PageHeaderProps = {
  title: string;
};

function PageHeader({ title }: PageHeaderProps) {
  return (
    <div className="zone header" id="header-zone">
      <div className="header-part" id="header-left">
        <h2 className="black">{title}</h2>
      </div>
      <div className="header-part" id="header-right">
        <UserMenu />
      </div>
    </div>
  );
}

export default PageHeader;
