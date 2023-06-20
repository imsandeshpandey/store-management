import { Box, Menu, MenuItem } from "@mui/joy";
import { useState } from "react";

//
export const Dropdown = ({ options, label, value, onChange, ...props }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (option) => {
    setAnchorEl(null);
    option && onChange(option);
  };
  return (
    <>
      <Box onMouseDown={handleClick} {...props.labelProps} children={label} />
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose} {...props}>
        {options?.map((option) => (
          <MenuItem key={option} onClick={() => handleClose(option)}>
            {option}
          </MenuItem>
        ))}
        {props.children}
      </Menu>
    </>
  );
};
export default Dropdown;

export const DropdownItem = ({ children, ...props }) => {
  return <MenuItem {...props}>{children}</MenuItem>;
};
