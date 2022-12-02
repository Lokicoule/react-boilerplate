import { Menu } from "@mui/material";
import React from "react";

type MenuButtonProps = {
  renderMenu?:
    | ((props: {
        anchorEl: HTMLElement | null;
        onClose: () => void;
      }) => React.ReactNode)
    | undefined;
  renderButton: (props: {
    onClick: (event: React.MouseEvent<HTMLElement>) => void;
  }) => React.ReactNode;
};

export const MenuButton: React.FC<MenuButtonProps> = ({
  renderButton,
  renderMenu,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {renderButton({ onClick: handleClick })}
      {renderMenu && (
        <Menu
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          onClick={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          {renderMenu({ onClose: handleClose, anchorEl })}
        </Menu>
      )}
    </>
  );
};