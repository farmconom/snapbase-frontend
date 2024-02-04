import { type FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { defaultImages } from '../constant/default-images.ts';
import { MdHistory, MdLogout } from 'react-icons/md';
import { PiReceipt, PiUserCircleFill } from 'react-icons/pi';
import SignOutModal from '../component/navbar/SignOutModal.tsx';
import Logo from '../assets/icon/Logo.tsx';
import { useDispatch, useSelector } from '../redux/index.ts';
import { Dropdown } from '@mui/base/Dropdown';
import { Menu } from '@mui/base/Menu';
import { MenuButton } from '@mui/base/MenuButton';
import { MenuItem } from '@mui/base/MenuItem';
import { Button } from '@mui/material';
import { initializeAccountSuccess } from '../redux/account.ts';

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
      <div className="w-full py-3 px-3 md:px-4 bg-[#142440] relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center z-[2]">
            <div
              onClick={() => onRedirect('/')}
              className="cursor-pointer hidden md:block">
              <Logo />
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-3 z-[2]">
            {!isSignIn ? (
              <Dropdown arrowIcon={false} inline className="w-[220px]">
                <MenuButton>
                  <div className="w-[32px] h-[32px]">
                    <img
                      alt="User settings"
                      src={defaultImages.noProfile}
                      className="w-full h-full rounded-full object-cover cursor-pointer"
                      onError={e => {
                        e.currentTarget.src = defaultImages.errorImage;
                      }}
                    />
                  </div>
                </MenuButton>
                <Menu>
                  <div className="pt-3">
                    <span className="flex gap-2 items-center text-sm mt-1 font-semibold">
                      John Deep
                    </span>
                  </div>

                  <MenuItem
                    className="flex gap-2 text-gray-700 font-normal"
                    onClick={() => onRedirect('/profile')}>
                    <PiUserCircleFill className="text-[20px] text-[#6B7280]" />
                    Profile
                  </MenuItem>
                  <MenuItem
                    className="flex gap-2 text-gray-700 font-normal"
                    onClick={() => onRedirect('/purchase')}>
                    <PiReceipt className="text-[20px] text-[#6B7280]" />
                    Purchase
                  </MenuItem>
                  <MenuItem
                    className="flex gap-2 text-gray-700 font-normal"
                    onClick={() => onRedirect('/history')}>
                    <MdHistory className="text-[20px] text-[#6B7280]" />
                    History
                  </MenuItem>
                  <MenuItem
                    className="text-red-600 gap-2 flex items-center pb-3"
                    onClick={() => setOpenSignOutModal(true)}>
                    <MdLogout className="w-[20px] h-[20px]" />
                    Disconnect
                  </MenuItem>
                </Menu>
              </Dropdown>
            ) : (
              <>
                <Button
                  className="h-[32px] sm:h-[36px]"
                  onClick={() =>
                    dispatch(initializeAccountSuccess({ isSignIn: true }))
                  }>
                  Connect Wallet
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
