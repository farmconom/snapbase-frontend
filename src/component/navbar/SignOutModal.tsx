import { Dispatch, SetStateAction } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { initializeAccountSuccess } from '../../redux/account';
import { useDispatch } from '../../redux';

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

  return (
    <Modal
      open={openModal}
      onClose={() => setOpenModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          className="items-center pb-1 border-0 pt-6 justify-center font-bold text-gray-900">
          Sign out?
        </Typography>
        <Typography id="modal-modal-description" className="px-5 !pb-0 !pt-0">
          <div className="text-sm leading-relaxed text-gray-500 dark:text-gray-400 text-center">
            Do you want to sign out ?
          </div>

          <div className="justify-end gap-2 border-0">
            <Button
              color="primary"
              className="min-w-[100px]"
              onClick={() => setOpenModal(false)}>
              Not now
            </Button>
            <Button
              color="error"
              className="min-w-[140px]"
              onClick={() => onSignOut()}>
              Sign out
            </Button>
          </div>
        </Typography>
      </Box>
    </Modal>
  );
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
