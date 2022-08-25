import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { history } from "../..";
//history มาจาก index.tsx

export default function ServerError() {
  const { state } = useLocation(); //อ่านออบเจคที่แนบมากับ agent.tsx (history.push('/server-error', { state: data }))

  var state1 = JSON.parse(JSON.stringify(state));
  console.log(state1);

  return (
    <Container component={Paper}>
      {state1 ? (
        <>
          <Typography variant="h3" color="error" gutterBottom>
            {state1.state.title}
          </Typography>
          <Divider />
          <Typography>
            {state1.state.detail || "Internal server error"}
          </Typography>
        </>
      ) : (
        <Typography variant="h5" gutterBottom>
          {state1.state.title}
        </Typography>
      )}
      <Button onClick={() => history.push("/catalog")}>
        Go back to the store
      </Button>
    </Container>
  );
}
