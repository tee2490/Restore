import { AppBar, Box, Switch, Toolbar, Typography } from "@mui/material";

export default function Header(props: any) {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Box display="flex" alignItems="center">
            <Typography
              variant="h6"
              sx={{ color: "inherit", textDecoration: "none" }}
            >
              TEE-StORE
            </Typography>
            <Switch onChange={props.handleMode} />
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
}