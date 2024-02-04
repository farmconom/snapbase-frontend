import { useRoutes } from 'react-router-dom';
import DevRoutes from './dev-route';
import ProdRoutes from './prod-route';

const mode = import.meta.env.MODE;

export default function Routes() {
  const routes = mode === 'development' ? DevRoutes : ProdRoutes;
  return useRoutes([routes]);
}
