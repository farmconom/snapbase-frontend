import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { defaultImages } from '../constant/default-images';

type Props = {
  onOpenSignOutModal: (isOpen: boolean) => void;
};

export default function UserMenu({ onOpenSignOutModal }: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null); // Specify the type of anchorEl
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        className="h-[32px] !min-w-[32px] !p-0"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}>
        <img
          src={defaultImages.noProfile}
          className="object-cover h-[32px] w-[32px]"
          alt="user image"
        />
      </Button>
      <Menu
        id="basic-menu"
        className="mt-2"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}>
        <MenuItem
          disabled
          style={{
            borderBottom: '1px solid #9ca3af',
            paddingBottom: '12px',
            marginBottom: '6px',
          }}
          className="!min-h-0">
          User Name
        </MenuItem>
        <MenuItem onClick={handleClose} className="!min-h-0">
          Profile
        </MenuItem>
        <MenuItem onClick={handleClose} className="!min-h-0">
          My account
        </MenuItem>
        <MenuItem
          onClick={() => onOpenSignOutModal(true)}
          className="!text-red-500 !min-h-0">
          Sign out
        </MenuItem>
      </Menu>
    </div>
  );
}
