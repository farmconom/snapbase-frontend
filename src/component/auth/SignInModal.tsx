import { Dispatch, SetStateAction, useState } from 'react';
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
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../firebase';
import { errorFormat } from '../../helper/error-format';
import { toast } from 'react-toastify';
import { Logger } from '../../helper/logger';
import CircularProgress from '@mui/material/CircularProgress';
import GenerateErrorText from '../@share/errorText';

const log = new Logger('SignInModal');

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

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState(' ');
  const [isLoading, setIsLoading] = useState(false);

  const onSignIn = () => {
    dispatch(initializeAccountSuccess({ isSignIn: true }));
    setErrorText(' ');
    setOpenModal(false);
  };
  const theme = useTheme();
  const onResponsive = useMediaQuery(theme.breakpoints.down('sm'));

  const signInWithGoogle = async () => {
    try {
      setIsLoading(true);
      const resp = await signInWithPopup(auth, googleProvider);
      if (resp) {
        if (resp.user.emailVerified) {
          onSignIn();
        } else {
          await auth.signOut();
          setErrorText('Please verify your email,');
        }
      } else {
        toast.error(`Something's wrong, Please try again.`);
      }
      log.debug('sign in with Google', resp);
    } catch (error) {
      const errorText: string = errorFormat(error).message;
      if (!errorText.includes('cancelled') && !errorText.includes('closed')) {
        toast.error(errorText);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithEmail = async () => {
    try {
      setIsLoading(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      log.info('sign in userCredential', userCredential);
      if (userCredential) {
        if (userCredential.user.emailVerified) {
          onSignIn();
        } else {
          await auth.signOut();
          setErrorText('Please verify your email,');
        }
      } else {
        toast.error(`Something's wrong, Please try again.`);
      }
    } catch (error) {
      const errorText: string = errorFormat(error).message;
      log.error(errorText);
      if (errorText.includes('invalid')) {
        setErrorText('Invalid email or password');
      } else if (errorText.includes('too-many-requests')) {
        toast.error(`Too many sign in requests.`);
      } else {
        toast.error(`Something's wrong, Please try again later.`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  //   const resendEmail = () => {
  //     await sendEmailVerification(auth.);
  //     await auth.signOut();
  // toast.success('Send verification email successfully.')
  //   }

  return (
    <Dialog
      fullWidth={onResponsive}
      TransitionComponent={Transition}
      open={openModal}
      onClose={() => {
        setErrorText(' ');
        setOpenModal(false);
      }}
      aria-labelledby="responsive-dialog-title"
      PaperProps={{
        component: 'form',
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          setErrorText(' ');
          setTimeout(() => {
            signInWithEmail();
          }, 100);
        },
      }}>
      <DialogTitle id="responsive-dialog-title" className="!pb-[12px]">
        <div className="p-0 border-0 !text-2xl text-center !font-bold !text-gray-800">
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
          value={email}
          onChange={e => setEmail(e.currentTarget.value)}
        />{' '}
        <TextField
          required
          margin="dense"
          id="password"
          name="password"
          label="Password"
          type="password"
          fullWidth
          variant="standard"
          value={password}
          onChange={e => setPassword(e.currentTarget.value)}
        />{' '}
        <DialogContentText className="w-full flex flex-wrap items-start gap-1">
          <GenerateErrorText text={errorText} onShow={errorText !== ' '} />
          {errorText === 'Please verify your email,' && (
            <span
              // onClick={() => {}}
              className="mt-2 text-sm text-red-500 hover:text-red-600 transition cursor-pointer underline">
              Resend email
            </span>
          )}
        </DialogContentText>
        <DialogContentText className="!mt-4 !text-xs !text-gray-400">
          If you have a google account, you can
        </DialogContentText>
        <Button
          variant="outlined"
          className="!min-w-[100px] !max-w-[193px] h-[40px] m-0 w-full sm:w-auto !border !border-gray-300 hover:!border-gray-600 !bg-white !text-gray-600 !mt-4 !rounded-full !capitalize"
          onClick={() => {
            setErrorText(' ');
            signInWithGoogle();
          }}>
          <FcGoogle className="me-2 text-xl" />
          Sign in with google
        </Button>{' '}
        <DialogContentText className="!mt-8 !text-sm flex flex-wrap gap-1 justify-center items-center">
          <span className="!text-gray-800">Don't have an account?</span>
          <span
            onClick={() => {
              setErrorText(' ');
              setOpenModal(false);
              setOpenSignUpModal(true);
            }}
            className="!text-primary-600 hover:!text-primary-800 transition cursor-pointer">
            Create a your account
          </span>
        </DialogContentText>
      </DialogContent>
      <DialogActions style={{ padding: '16px 24px' }}>
        <div className="flex flex-wrap w-full justify-center sm:justify-end gap-2 border-0 !p-0">
          <Button
            variant="text"
            className="!min-w-[100px] h-[40px] m-0 w-full sm:w-auto"
            onClick={() => {
              setErrorText(' ');
              setOpenModal(false);
            }}>
            Not now
          </Button>
          <Button
            variant="contained"
            disabled={isLoading}
            color="primary"
            className="!min-w-[100px] h-[40px] m-0 w-full sm:w-auto"
            type="submit">
            {isLoading ? (
              <CircularProgress size="24px" color="inherit" />
            ) : (
              'Confirm'
            )}
          </Button>{' '}
        </div>
      </DialogActions>
    </Dialog>
  );
}
