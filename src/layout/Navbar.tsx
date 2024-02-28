import { type FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignOutModal from '../component/navbar/SignOutModal.tsx';
import Logo from '../assets/icon/Logo.tsx';
import { useDispatch, useSelector } from '../redux/index.ts';
import { initializeAccountSuccess } from '../redux/account.ts';
import Button from '@mui/material/Button';
import UserMenu from './UserMenu.tsx';

const AppNavbar: FC = function () {
  const [openSignOutModal, setOpenSignOutModal] = useState(false);
  const navigate = useNavigate();
  const { isSignIn } = useSelector(state => state.account);
  const dispatch = useDispatch();

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
              className="cursor-pointer hidden md:block h-[32px]">
              <Logo />
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-3 z-[2]">
            {isSignIn ? (
              <>
                <UserMenu />
              </>
            ) : (
              <>
                <Button
                  variant="contained"
                  className="h-[32px]"
                  onClick={() =>
                    dispatch(initializeAccountSuccess({ isSignIn: true }))
                  }>
                  Sign in
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
    </>
  );
};

export default AppNavbar;
