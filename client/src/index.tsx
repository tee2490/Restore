import ReactDOM from "react-dom/client";
import App from "./app/layout/App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserHistory } from "history";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { StoreProvider } from "./app/context/StoreContext";

export const history = createBrowserHistory({ window });

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <HistoryRouter history={history}>
    <StoreProvider>
      <App />
    </StoreProvider>
  </HistoryRouter>
);

reportWebVitals();
