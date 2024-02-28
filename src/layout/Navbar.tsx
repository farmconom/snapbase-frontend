import { type FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignOutModal from '../component/auth/SignOutModal.tsx';
import Logo from '../assets/icon/Logo.tsx';
import { useSelector } from '../redux/index.ts';
import Button from '@mui/material/Button';
import UserMenu from './UserMenu.tsx';
import { FaUser } from 'react-icons/fa6';
import SignInModal from '../component/auth/SignInModal.tsx';
import SignUpModal from '../component/auth/SignUpModal.tsx';

const AppNavbar: FC = function () {
  const [openSignOutModal, setOpenSignOutModal] = useState(false);
  const [openSignInModal, setOpenSignInModal] = useState(false);
  const [openSignUpModal, setOpenSignUpModal] = useState(false);
  const navigate = useNavigate();
  const { isSignIn } = useSelector(state => state.account);

  const onRedirect = (url: string) => {
    navigate(url);
  };

  return (
    <>
      <div className="py-3 px-3 md:px-4 bg-[#142440] relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center z-[2]">
            <div
              onClick={() => onRedirect('/')}
              className="cursor-pointer hidden sm:block h-[32px]">
              <Logo />
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-3 z-[2]">
            {isSignIn ? (
              <>
                <UserMenu onOpenSignOutModal={setOpenSignOutModal} />
              </>
            ) : (
              <>
                <Button
                  variant="contained"
                  className="h-[32px] !min-w-[120px]"
                  onClick={() => setOpenSignInModal(true)}>
                  <FaUser className="me-2" /> Sign in
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
      <SignOutModal
        openModal={openSignOutModal}
        setOpenModal={setOpenSignOutModal}
      />
      <SignInModal
        openModal={openSignInModal}
        setOpenModal={setOpenSignInModal}
        setOpenSignUpModal={setOpenSignUpModal}
      />
      <SignUpModal
        openModal={openSignUpModal}
        setOpenModal={setOpenSignUpModal}
        setOpenSignInModal={setOpenSignInModal}
      />
    </>
  );
};

export default AppNavbar;
