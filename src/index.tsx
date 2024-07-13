import ReactDOM from "react-dom/client";
import App from "./App";
import MainProviders from "./providers/MainProviders";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <MainProviders>
    <App />
  </MainProviders>,
);
