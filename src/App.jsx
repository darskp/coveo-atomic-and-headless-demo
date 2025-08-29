import { Provider } from "react-redux";
import { ThemeModeProvider } from "../theme/ThemeContext";
import "./App.css";
import { Headless } from "./coveo/Headless";
import store from "./reduxTookit/store";

function App() {
  return (
    <ThemeModeProvider>
      <Provider store={store}>
        <Headless />
      </Provider>
    </ThemeModeProvider>
  );
}

export default App;
