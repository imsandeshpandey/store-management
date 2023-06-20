import { Box } from "@mui/joy";
import { forwardRef } from "react";

const Flex = forwardRef(
  ({ aiCenter, jcCenter, ai, jc, gap, column, center, ...rest }, ref) => (
    <Box
      ref={ref}
      display="flex"
      boxSizing="border-box"
      alignItems={ai || ((aiCenter || center) && "center")}
      justifyContent={jc || ((jcCenter || center) && "center")}
      flexDirection={column && "column"}
      sx={{ gap: gap, ...rest.sx }}
      {...rest}
    />
  )
);

export default Flex;
