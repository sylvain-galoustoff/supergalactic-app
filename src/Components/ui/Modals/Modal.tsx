type ModalProps = {
  box: JSX.Element | null;
};

function Modal({ box }: ModalProps) {
  return <div id="modal">{box}</div>;
}

export default Modal;
