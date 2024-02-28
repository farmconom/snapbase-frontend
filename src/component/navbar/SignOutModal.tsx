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
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Dialog
      fullScreen={fullScreen}
      open={openModal}
      onClose={() => setOpenModal(false)}
      aria-labelledby="responsive-dialog-title">
      <DialogTitle id="responsive-dialog-title">
        <div className="items-center p-0 border-0 !text-2xl justify-center text-center !font-bold text-red-500">
          Sign out
        </div>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>Do you want to sign out ? </DialogContentText>
      </DialogContent>
      <DialogActions>
        <div className="flex flex-wrap justify-center gap-2 border-0 !p-0">
          <Button
            variant="contained"
            className="min-w-[100px] h-[40px] m-0"
            onClick={() => setOpenModal(false)}>
            Not now
          </Button>
          <Button
            variant="contained"
            className="min-w-[100px] h-[40px] m-0"
            onClick={() => onSignOut()}>
            Sign out
          </Button>{' '}
        </div>
      </DialogActions>
    </Dialog>
  );
}
