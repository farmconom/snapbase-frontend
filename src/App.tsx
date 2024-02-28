import Routes from './route';
import { BrowserRouter } from 'react-router-dom';
import Toastify from './wrapper/Toastify';
import { CombineComponents } from './wrapper/CombineComponents';
import ReduxProvider from './wrapper/ReduxProvider';
import ScrollTopPortal from './wrapper/ScrollTopPortal';
import LightboxPortal from './wrapper/LightboxPortal';
import { ThemeProvider } from '@mui/material/styles';
import { themeMUI } from '../MUItheme';
const providers = [
  Toastify,
  ReduxProvider,
  BrowserRouter,
  ScrollTopPortal,
  LightboxPortal,
];
const AppProvider = CombineComponents(...providers);

export default function App() {
  return (
    <ThemeProvider theme={themeMUI}>
      {' '}
      <AppProvider>
        <Routes />
      </AppProvider>
    </ThemeProvider>
  );
}
