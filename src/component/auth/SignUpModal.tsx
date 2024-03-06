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
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase';
import { Logger } from '../../helper/logger';
import { toast } from 'react-toastify';
import GenerateErrorText from '../@share/errorText';
import { errorFormat } from '../../helper/error-format';
import emailjs from 'emailjs-com';
import environment from '../../environment';
import PasswordStrengthBar from 'react-password-strength-bar';
import { sendEmailVerification } from '../../rest-api/auth-api';

const log = new Logger('SignUpModal');

const nameRegex = /[^!@#$%^&*()_+={}[\]:;"'<>,.?/\\|`~-]*/g;

type Props = {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  setOpenSignInModal: Dispatch<SetStateAction<boolean>>;
  setOpenAfterSignUpModal: Dispatch<SetStateAction<boolean>>;
  emailOutput: Dispatch<SetStateAction<string>>;
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
  emailOutput,
}: Props) {
  const theme = useTheme();
  const onResponsive = useMediaQuery(theme.breakpoints.down('sm'));

  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [scoreWordColor, setScoreWordColor] = useState('#ddd');
  const [errorText, setErrorText] = useState(' ');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (formValidation()) return;
    try {
      setIsLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      log.info('sign up userCredential', userCredential);
      const user = userCredential.user;
      const idToken = await user.getIdToken();
      if (user && idToken) {
        await updateProfile(user, {
          displayName: userName,
        });
        const resp = await sendEmail();
        await auth.signOut();
        if (resp) {
          emailOutput(email);
          onCloseModal();
          setOpenAfterSignUpModal(true);
        }
      } else {
        toast.error(`Something's wrong, Please try again later.`);
      }
    } catch (error) {
      const errorText: string = errorFormat(error).message;
      log.error(errorText);
      if (errorText.includes('auth/email-already-in-use')) {
        setErrorText(`This email is already in use`);
      } else {
        toast.error(`Something's wrong, Please try again later.`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const sendEmail = async () => {
    try {
      const link = await sendEmailVerification(email);
      if (link.data) {
        const resp = await emailjs.send(
          'service_ipir5cd',
          'template_8mfn5ci',
          {
            to_name: userName,
            to_email: email,
            verification_link: `${link.data}&userEmail=${email}`,
          },
          environment.emailjs.publicKey
        );
        if (resp.status === 200) {
          return true;
        }
      } else {
        toast.error(`Something's wrong, Please try again later.`);
        return false;
      }
    } catch (error) {
      log.error('Email sending failed:', error);
      toast.error(`Something's wrong, Please try again later.`);
      return false;
    }
  };

  const formValidation = () => {
    if (
      userName &&
      userName.match(nameRegex) &&
      !!userName.match(nameRegex)?.length
    ) {
      if (userName.match(nameRegex)!.filter(item => item === '').length > 1) {
        setErrorText('User name format is incorrect');
        return true;
      } else if (userName.length < 3) {
        setErrorText('User name should be at least 3 characters');
        return true;
      }
    } else if (password.length < 6) {
      setErrorText('Password should be at least 6 characters');
      return true;
    } else if (password !== confirmPassword) {
      setErrorText('Passwords do not match');
      return true;
    } else {
      setErrorText(' ');
      return false;
    }
  };

  const settingScoreWordColor = (score: number) => {
    switch (score) {
      case 0:
        setScoreWordColor('#a6a6a6');
        break;
      case 1:
        setScoreWordColor('#ef4836');
        break;
      case 2:
        setScoreWordColor('#eca93e');
        break;
      case 3:
        setScoreWordColor('#2b90ef');
        break;
      case 4:
        setScoreWordColor('#25c281');
        break;
      default:
        setScoreWordColor('#a6a6a6');
        break;
    }
  };

  const onCloseModal = () => {
    setEmail('');
    setUserName('');
    setPassword('');
    setConfirmPassword('');
    setErrorText(' ');
    setIsLoading(false);
    setOpenModal(false);
  };

  return (
    <Dialog
      fullWidth={onResponsive}
      TransitionComponent={Transition}
      open={openModal}
      onClose={() => {
        if (!isLoading) {
          onCloseModal();
        }
      }}
      aria-labelledby="responsive-dialog-title"
      PaperProps={{
        component: 'form',
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          setErrorText(' ');
          setTimeout(() => {
            handleSubmit();
          }, 200);
        },
      }}>
      <DialogTitle id="responsive-dialog-title" className="!pb-[12px]">
        <div className="p-0 border-0 !text-2xl text-center !font-bold !text-gray-800">
          SIGN UP
        </div>
      </DialogTitle>
      <DialogContent className="flex flex-col justify-center items-center min-w-0 sm:min-w-[350px]">
        <TextField
          required
          disabled={isLoading}
          value={userName}
          onChange={e => setUserName(e.currentTarget.value)}
          margin="dense"
          id="userName"
          name="userName"
          label="User Name"
          type="text"
          fullWidth
          variant="standard"
        />{' '}
        <TextField
          required
          disabled={isLoading}
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
          disabled={isLoading}
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
        <div
          className={
            (password ? 'h-[7px]' : 'h-[1px]') + ' w-full transition-all'
          }>
          <PasswordStrengthBar
            onChangeScore={score => settingScoreWordColor(score)}
            scoreWordStyle={{ color: scoreWordColor }}
            password={password}
            minLength={6}
            className={
              (password ? 'opacity-100' : 'opacity-0') +
              ' w-full text-center password-strength-bar'
            }
          />
        </div>
        <TextField
          required
          disabled={isLoading}
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
          <GenerateErrorText text={errorText} onShow={errorText !== ' '} />
        </DialogContentText>
        <DialogContentText className="!mt-8 !text-sm flex flex-wrap gap-1 justify-center items-center">
          <span className="!text-gray-800">Already have an account?</span>
          <span
            onClick={() => {
              if (!isLoading) {
                onCloseModal();
                setOpenSignInModal(true);
              }
            }}
            className={
              (isLoading ? 'cursor-not-allowed ' : 'cursor-pointer ') +
              '!text-primary-600 hover:!text-primary-800 transition'
            }>
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
            className="!min-w-[100px] h-[40px] m-0 w-full sm:w-auto"
            onClick={() => onCloseModal()}>
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
