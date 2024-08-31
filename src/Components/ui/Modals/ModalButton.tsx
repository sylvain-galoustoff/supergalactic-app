import { useModalContext } from "../../../context/ModalContext";

type ModalButtonType = {
  label: string;
  icon: JSX.Element;
  modal: JSX.Element;
  variant?: "primary" | "success" | "warning" | "danger";
};

function ModalButton({ label, icon, modal, variant }: ModalButtonType) {
  const { setBox } = useModalContext();

  const openModal = () => {
    setBox(modal);
  };

  return (
    <button type="button" className={variant ? variant : undefined} onClick={openModal}>
      {icon}
      {label}
    </button>
  );
}

export default ModalButton;
