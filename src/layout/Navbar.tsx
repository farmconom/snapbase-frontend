import { type FC, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { defaultImages } from '../constant/default-images.ts';
import SignOutModal from '../component/navbar/SignOutModal.tsx';
import Logo from '../assets/icon/Logo.tsx';
import { useDispatch, useSelector } from '../redux/index.ts';
import { Button } from 'primereact/button';
import { initializeAccountSuccess } from '../redux/account.ts';
import { Menu } from 'primereact/menu';
import { MenuItem } from 'primereact/menuitem';

const AppNavbar: FC = function () {
  const [openSignOutModal, setOpenSignOutModal] = useState(false);
  const navigate = useNavigate();
  const { isSignIn } = useSelector(state => state.account);
  const dispatch = useDispatch();

  const onRedirect = (url: string) => {
    navigate(url);
  };

  const userMenu = useRef<Menu | null>(null);
  const items: MenuItem[] = [
    {
      className: 'py-2',
      label: 'John Deep',
      items: [
        {
          className: 'sign-out-menu',
          label: 'Sign out',
          icon: 'pi pi-sign-out',
          command: () => setOpenSignOutModal(true),
        },
      ],
    },
  ];

  return (
    <>
      <div className="w-full py-3 px-3 md:px-4 bg-[#142440] relative">
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
                <Menu
                  model={items}
                  popup
                  ref={userMenu}
                  id="popup_menu_left"
                  className="py-0 rounded-md overflow-hidden mt-2"
                />
                <div className="w-[32px] h-[32px]">
                  <img
                    alt="User settings"
                    src={defaultImages.noProfile}
                    className="w-full h-full rounded-full object-cover cursor-pointer"
                    onError={e => {
                      e.currentTarget.src = defaultImages.errorImage;
                    }}
                    onClick={event =>
                      userMenu &&
                      userMenu.current &&
                      userMenu.current.toggle(event)
                    }
                  />
                </div>
                {/* // <MenuButton>
                //   <div className="w-[32px] h-[32px]">
                //     <img
                //       alt="User settings"
                //       src={defaultImages.noProfile}
                //       className="w-full h-full rounded-full object-cover cursor-pointer"
                //       onError={e => {
                //         e.currentTarget.src = defaultImages.errorImage;
                //       }}
                //     />
                //   </div>
                // </MenuButton>
                // <Menu className="bg-black text-white p-3 rounded-md !top-2 !-left-2">
                //   <div>
                //     <span className="flex gap-2 items-center text-sm font-semibold">
                //       John Deep
                //     </span>
                //   </div>

                //   <MenuItem
                //     className="text-red-600 hover:text-red-500 transition gap-2 flex items-center cursor-pointer mt-3"
                //     onClick={() => setOpenSignOutModal(true)}>
                //     <MdLogout className="w-[20px] h-[20px]" />
                //     Disconnect
                //   </MenuItem>
                // </Menu> */}
              </>
            ) : (
              <>
                <Button
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
