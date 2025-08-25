import { useModal } from '../../context/Modal';

/**
 * OpenModalButton component renders a button that opens a modal when clicked.
 * 
 * @param {Object} props - The component props
 * @param {JSX.Element} props.modalComponent - Component to render inside the modal
 * @param {string} props.buttonText - Text of the button that opens the modal
 * @param {Function} [props.onButtonClick] - Optional callback function called when button is clicked
 * @param {Function} [props.onModalClose] - Optional callback function called when modal is closed
 * @returns {JSX.Element} The modal button component
 */
function OpenModalButton({
  modalComponent,
  buttonText,
  onButtonClick,
  onModalClose
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (typeof onButtonClick === "function") onButtonClick();
  };

  return <button onClick={onClick}>{buttonText}</button>;
}

export default OpenModalButton;
