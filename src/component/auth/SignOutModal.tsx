import { Dispatch, SetStateAction } from 'react';
import Button from '@mui/material/Button';
import { initializeAccountSuccess } from '../../redux/account';
import { useDispatch } from '../../redux';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import React from 'react';
import Slide, { SlideProps } from '@mui/material/Slide';

type Props = {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
};

const Transition = React.forwardRef<HTMLDivElement, SlideProps>(
  function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  }
);

export default function SignOutModal({ openModal, setOpenModal }: Props) {
  const dispatch = useDispatch();

  const onSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(initializeAccountSuccess({ isSignIn: false, user: null }));
    setOpenModal(false);
  };
  const theme = useTheme();
  const onResponsive = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      fullWidth={onResponsive}
      TransitionComponent={Transition}
      open={openModal}
      classes={{ paper: 'min-w-[260px]' }}
      onClose={() => setOpenModal(false)}
      aria-labelledby="responsive-dialog-title">
      <DialogTitle
        id="responsive-dialog-title"
        className="!text-2xl text-center !font-bold text-red-500">
        SIGN OUT
      </DialogTitle>
      <DialogContent>
        <DialogContentText className="text-center text-gray-800">
          Do you want to sign out ?
        </DialogContentText>
      </DialogContent>
      <DialogActions style={{ padding: '16px 24px' }}>
        <div className="flex flex-wrap w-full justify-center gap-2 border-0 !p-0">
          <Button
            variant="text"
            className="!min-w-[100px] h-[40px] m-0 w-full"
            onClick={() => setOpenModal(false)}>
            Not now
          </Button>
          <Button
            variant="contained"
            color="error"
            className="!min-w-[100px] h-[40px] m-0 w-full"
            onClick={() => onSignOut()}>
            Confirm
          </Button>{' '}
        </div>
      </DialogActions>
    </Dialog>
  );
}
