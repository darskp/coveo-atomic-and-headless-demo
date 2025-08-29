import { Provider } from "react-redux";
import "./App.css";
import store from "./reduxTookit/store";
import { Headless } from "./coveo";

function App() {
  return (
      <Provider store={store}>
        <Headless />
      </Provider>
  );
}

export default App;
