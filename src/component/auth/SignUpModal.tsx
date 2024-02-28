import { Dispatch, SetStateAction, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import React from 'react';
import Slide, { SlideProps } from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import { DialogContentText } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';
import { auth } from '../../firebase';
import { Logger } from '../../helper/logger';
import { toast } from 'react-toastify';
import GenerateErrorText from '../@share/errorText';

const log = new Logger('SignUpModal');

type Props = {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  setOpenSignInModal: Dispatch<SetStateAction<boolean>>;
  setOpenAfterSignUpModal: Dispatch<SetStateAction<boolean>>;
};

const Transition = React.forwardRef<HTMLDivElement, SlideProps>(
  function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  }
);

export default function SignUpModal({
  openModal,
  setOpenModal,
  setOpenSignInModal,
  setOpenAfterSignUpModal,
}: Props) {
  const theme = useTheme();
  const onResponsive = useMediaQuery(theme.breakpoints.down('sm'));

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorText, setErrorText] = useState('none');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (checkPassword()) return;
    try {
      setIsLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential);
      const user = userCredential.user;
      const idToken = await user.getIdToken();
      if (user && idToken) {
        await sendEmailVerification(user);
        await auth.signOut();
        setOpenModal(false);
        setOpenAfterSignUpModal(true);
      } else {
        toast.error(`Something's wrong, Please try again.`);
      }
    } catch (error) {
      log.error(error);
      if (String(error).includes('auth/email-already-in-use')) {
        setErrorText(`This Email is already in use`);
      } else {
        toast.error(`Something's wrong, Please try again.`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const checkPassword = () => {
    if (password.length < 6) {
      setErrorText('Password should be at least 6 characters');
      return true;
    } else if (password !== confirmPassword) {
      setErrorText('Passwords do not match');
      return true;
    } else {
      setErrorText('none');
      return false;
    }
  };

  return (
    <Dialog
      fullWidth={onResponsive}
      TransitionComponent={Transition}
      open={openModal}
      onClose={() => setOpenModal(false)}
      aria-labelledby="responsive-dialog-title"
      PaperProps={{
        component: 'form',
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          handleSubmit();
        },
      }}>
      <DialogTitle id="responsive-dialog-title" className="!pb-[12px]">
        <div className="p-0 border-0 !text-2xl text-center !font-bold">
          SIGN UP
        </div>
      </DialogTitle>
      <DialogContent className="flex flex-col justify-center items-center min-w-0 sm:min-w-[350px]">
        <TextField
          required
          value={email}
          onChange={e => setEmail(e.currentTarget.value)}
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
          value={password}
          onChange={e => setPassword(e.currentTarget.value)}
          margin="dense"
          id="password"
          name="password"
          label="Password"
          type="password"
          fullWidth
          variant="standard"
        />{' '}
        <TextField
          required
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.currentTarget.value)}
          margin="dense"
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          fullWidth
          variant="standard"
        />{' '}
        <DialogContentText className="w-full flex items-start">
          <GenerateErrorText text={errorText} onShow={errorText !== 'none'} />
        </DialogContentText>
        <DialogContentText className="!mt-8 !text-sm flex flex-wrap gap-1 justify-center items-center">
          <span>Already have an account?</span>
          <span
            onClick={() => {
              setOpenModal(false);
              setOpenSignInModal(true);
            }}
            className="!text-primary-600 hover:!text-primary-800 transition cursor-pointer">
            Go to Sign In
          </span>
        </DialogContentText>
      </DialogContent>
      <DialogActions style={{ padding: '16px 24px' }}>
        <div className="flex flex-wrap w-full justify-center sm:justify-end gap-2 border-0 !p-0">
          <Button
            variant="text"
            color="secondary"
            disabled={isLoading}
            className="min-w-[100px] h-[40px] m-0 w-full sm:w-auto"
            onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            disabled={isLoading}
            color="success"
            className="!min-w-[100px] h-[40px] m-0 w-full sm:w-auto"
            type="submit">
            {isLoading ? (
              <CircularProgress size="24px" color="inherit" />
            ) : (
              'Submit'
            )}
          </Button>{' '}
        </div>
      </DialogActions>
    </Dialog>
  );
}
