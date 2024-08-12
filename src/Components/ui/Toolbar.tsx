type ToolbarProps = {
  left?: JSX.Element | JSX.Element[];
  right?: JSX.Element | JSX.Element[];
};

function Toolbar({ left, right }: ToolbarProps) {
  return (
    <div className="zone" id="toolbar-zone">
      <div id="toolbar">
        {left && <div id="left-tools">{left}</div>}
        {right && <div id="right-tools">{right}</div>}
      </div>
    </div>
  );
}

export default Toolbar;
