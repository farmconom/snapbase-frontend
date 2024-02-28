import { Dispatch, SetStateAction } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import React from 'react';
import Slide, { SlideProps } from '@mui/material/Slide';
import { FaRegCheckCircle } from 'react-icons/fa';

type Props = {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  setOpenSignInModal: Dispatch<SetStateAction<boolean>>;
};

const Transition = React.forwardRef<HTMLDivElement, SlideProps>(
  function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  }
);

export default function AfterSignUpModal({
  openModal,
  setOpenModal,
  setOpenSignInModal,
}: Props) {
  const theme = useTheme();
  const onResponsive = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      fullWidth={onResponsive}
      TransitionComponent={Transition}
      open={openModal}
      onClose={() => setOpenModal(false)}
      aria-labelledby="responsive-dialog-title">
      <DialogTitle id="responsive-dialog-title">
        <div className="p-0 border-0 !text-2xl text-center !font-bold text-green-500 ms-[-10px]">
          <FaRegCheckCircle className="mb-[-3px]" /> SUCCESS
        </div>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <div className="p-0 border-0 text-center flex flex-col gap-4">
            <span>
              🎉 You've successfully signed up and joined our community! 🎉
            </span>
            <span className="text-sm">
              Thank you for choosing to be a part of our platform. We're
              thrilled to have you here and can't wait to see what amazing
              experiences we'll share together. 🚀🚀
            </span>
            <span className="text-green-500">
              <hr className="mb-4" style={{ border: '0.5px solid #d1d5db' }} />
              Please check your email for further instructions. We've sent you a
              confirmation message to verify your account. If you don't see the
              email in your inbox, be sure to check your spam folder.
            </span>
          </div>
        </DialogContentText>
      </DialogContent>
      <DialogActions style={{ padding: '16px 24px' }}>
        <div className="flex flex-wrap w-full justify-center gap-2 border-0 !p-0">
          <Button
            variant="contained"
            color="success"
            className="min-w-[100px] h-[40px] m-0"
            onClick={() => {
              setOpenModal(false);
              setOpenSignInModal(true);
            }}>
            Continue
          </Button>{' '}
        </div>
      </DialogActions>
    </Dialog>
  );
}
