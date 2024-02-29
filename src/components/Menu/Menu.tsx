import { CSSProperties, FC, PropsWithChildren, ReactElement } from 'react';
import { CloseModalButton, CreateMenu } from './style';

interface props {
  show: boolean;
  onCloseModal: (e: any) => void;
  style: CSSProperties;
  children: React.ReactNode;
}

const Menu: FC<props> = ({ children, style, show, onCloseModal }) => {
  const stopPropogation = (e: any) => {
    e.stopPropagation;
  };
  if (!show) {
    return null;
  }
  return (
    <CreateMenu onClick={onCloseModal}>
      <div onClick={stopPropogation} style={style}>
        {show && <CloseModalButton onClick={onCloseModal}>&times;</CloseModalButton>}
        {children}
      </div>
    </CreateMenu>
  );
};

export default Menu;
