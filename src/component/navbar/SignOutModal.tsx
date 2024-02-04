import { Dispatch, SetStateAction } from 'react';
import { Button } from 'primereact/button';
import { initializeAccountSuccess } from '../../redux/account';
import { useDispatch } from '../../redux';
import { Dialog } from 'primereact/dialog';

type Props = {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
};

export default function SignOutModal({ openModal, setOpenModal }: Props) {
  const dispatch = useDispatch();

  const onSignOut = () => {
    dispatch(initializeAccountSuccess({ isSignIn: false }));
    setOpenModal(false);
  };

  const headerElement = (
    <div className="items-center p-0 border-0 !text-2xl justify-center text-center !font-bold text-red-500">
      Sign out
    </div>
  );

  const footerContent = (
    <div className="flex flex-wrap justify-center gap-2 border-0 !p-0">
      <Button
        severity="secondary"
        className="min-w-[100px] h-[40px] m-0"
        label="Not now"
        onClick={() => setOpenModal(false)}
      />
      <Button
        severity="danger"
        label="Sign out"
        className="min-w-[100px] h-[40px] m-0"
        onClick={() => onSignOut()}
      />
    </div>
  );

  return (
    <Dialog
      visible={openModal}
      closable={false}
      modal
      header={headerElement}
      footer={footerContent}
      onHide={() => setOpenModal(false)}
      style={{ width: '350px' }}
      breakpoints={{ '385px': '100vw' }}>
      <div className=" text-center">
        <span className="text-md leading-relaxed !text-gray-500 ">
          Do you want to sign out ?
        </span>
      </div>
    </Dialog>
  );
}
