import Routes from './route';
import { BrowserRouter } from 'react-router-dom';
import Toastify from './wrapper/Toastify';
import { CombineComponents } from './wrapper/CombineComponents';
import ReduxProvider from './wrapper/ReduxProvider';
import ScrollTopPortal from './wrapper/ScrollTopPortal';
import LightboxPortal from './wrapper/LightboxPortal';
import { PrimeReactProvider } from 'primereact/api';
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
    <PrimeReactProvider>
      <AppProvider>
        <Routes />
      </AppProvider>
    </PrimeReactProvider>
  );
}
