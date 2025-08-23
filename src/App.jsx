import { ThemeModeProvider } from '../theme/ThemeContext';
import './App.css'
import { Headless } from './coveo/Headless';

function App() {
  return (
      <ThemeModeProvider>
        <Headless />
      </ThemeModeProvider>
  )
}

export default App
