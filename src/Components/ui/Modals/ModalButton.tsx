import { useModalContext } from "../../../context/ModalContext";

type ModalButtonType = {
  label: string;
  icon: JSX.Element;
  modal: JSX.Element;
};

function ModalButton({ label, icon, modal }: ModalButtonType) {
  const { setBox } = useModalContext();

  const openModal = () => {
    setBox(modal);
  };

  return (
    <button type="button" onClick={openModal}>
      {icon}
      {label}
    </button>
  );
}

export default ModalButton;
