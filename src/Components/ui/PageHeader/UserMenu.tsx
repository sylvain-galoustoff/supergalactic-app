import { IoPersonCircleOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

function UserMenu() {
  const currentUser = useSelector((state: RootState) => state.user);

  return (
    <div id="display-name">
      <IoPersonCircleOutline /> {currentUser?.displayName}
    </div>
  );
}

export default UserMenu;
