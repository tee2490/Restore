import React from "react";
import ReactDOM from "react-dom/client";
import "./app/layout/styles.css";
import App from "./app/layout/App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserHistory } from "history";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { StoreProvider } from "./app/context/StoreContext";
import { store } from "./app/store/configureStore";
import { Provider } from "react-redux";


export const history = createBrowserHistory({ window });

//const store = configureStore();
//console.log(store.getState());


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <HistoryRouter history={history}>
        <Provider store={store}>
          <App />
        </Provider>
    </HistoryRouter>
  </React.StrictMode>
);

reportWebVitals();
