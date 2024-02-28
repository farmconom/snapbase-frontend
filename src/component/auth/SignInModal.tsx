import { Dispatch, SetStateAction } from 'react';
import Button from '@mui/material/Button';
import { initializeAccountSuccess } from '../../redux/account';
import { useDispatch } from '../../redux';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import React from 'react';
import Slide, { SlideProps } from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import { FcGoogle } from 'react-icons/fc';
import { DialogContentText } from '@mui/material';

type Props = {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  setOpenSignUpModal: Dispatch<SetStateAction<boolean>>;
};

const Transition = React.forwardRef<HTMLDivElement, SlideProps>(
  function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  }
);

export default function SignInModal({
  openModal,
  setOpenModal,
  setOpenSignUpModal,
}: Props) {
  const dispatch = useDispatch();

  const onSignIn = () => {
    dispatch(initializeAccountSuccess({ isSignIn: true }));
    setOpenModal(false);
  };
  const theme = useTheme();
  const onResponsive = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      fullWidth={onResponsive}
      TransitionComponent={Transition}
      open={openModal}
      onClose={() => setOpenModal(false)}
      aria-labelledby="responsive-dialog-title"
      PaperProps={{
        component: 'form',
        onSubmit: () => {
          console.log('email');
          setOpenModal(false);
        },
      }}>
      <DialogTitle id="responsive-dialog-title" className="!pb-[12px]">
        <div className="p-0 border-0 !text-2xl text-center !font-bold">
          SIGN IN
        </div>
      </DialogTitle>
      <DialogContent className="flex flex-col justify-center items-center min-w-0 sm:min-w-[350px]">
        <TextField
          required
          margin="dense"
          id="email"
          name="email"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
        />{' '}
        <TextField
          required
          margin="dense"
          id="password"
          name="password"
          label="Password"
          type="text"
          fullWidth
          variant="standard"
        />{' '}
        <DialogContentText className="!mt-4 !text-xs !text-gray-400">
          If you have a google account, you can
        </DialogContentText>
        <Button
          variant="outlined"
          className="min-w-[100px] max-w-[193px] h-[40px] m-0 w-full sm:w-auto !border !border-gray-300 hover:!border-gray-600 !bg-white !text-gray-600 !mt-4 !rounded-full !capitalize"
          onClick={() => onSignIn()}>
          <FcGoogle className="me-2 text-xl" />
          Sign in with google
        </Button>{' '}
        <DialogContentText className="!mt-8 !text-sm flex flex-wrap gap-1 justify-center items-center">
          <span>Don't have an account?</span>
          <span
            onClick={() => {
              setOpenModal(false);
              setOpenSignUpModal(true);
            }}
            className="!text-primary-600 hover:!text-primary-800 transition cursor-pointer">
            Create a SnapBase account
          </span>
        </DialogContentText>
      </DialogContent>
      <DialogActions style={{ padding: '16px 24px' }}>
        <div className="flex flex-wrap w-full justify-center sm:justify-end gap-2 border-0 !p-0">
          <Button
            variant="text"
            className="min-w-[100px] h-[40px] m-0 w-full sm:w-auto"
            onClick={() => setOpenModal(false)}>
            Not now
          </Button>
          <Button
            variant="contained"
            color="primary"
            className="min-w-[100px] h-[40px] m-0 w-full sm:w-auto"
            onClick={() => onSignIn()}>
            Confirm
          </Button>{' '}
        </div>
      </DialogActions>
    </Dialog>
  );
}
