import PageHeader from "../../Components/ui/PageHeader/PageHeader";
import Toolbar from "../../Components/ui/Toolbar";

function Tasks() {
  return (
    <main id="clients">
      <PageHeader title="Tâches" />
      <Toolbar />
      <div className="zone" id="content-zone"></div>
    </main>
  );
}

export default Tasks;
