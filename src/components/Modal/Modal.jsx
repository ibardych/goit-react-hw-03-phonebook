import { ModalStyled } from 'components/Modal/Modal.styled';
import { TfiClose } from 'react-icons/tfi';

const Modal = ({ onCloseModal, modalOpened, children }) => {
  return (
    <ModalStyled
      onClick={onCloseModal}
      className={!modalOpened ? 'is-hidden' : ''}
    >
      <div className="window">
        <div className="inner">
          <div className="container">
            <TfiClose onClick={onCloseModal} className="close">
              X
            </TfiClose>
            <div className="text">{children}</div>
          </div>
        </div>
      </div>
    </ModalStyled>
  );
};

export default Modal;
