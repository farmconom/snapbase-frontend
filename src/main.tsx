import './assets/css/tailwind.scss';
import './assets/css/style.scss';
import 'react-toastify/dist/ReactToastify.css';
import 'react-tooltip/dist/react-tooltip.css';
import 'react-18-image-lightbox/style.css';

/* Add this line to include PrimeReact styles */
import 'primereact/resources/themes/tailwind-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import ReactDOM from 'react-dom/client';
import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
