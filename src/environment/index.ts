import devEnv from './development';
import prodEnv from './production';

const mode = import.meta.env.MODE;

let environment = devEnv;
if (mode === 'production') environment = prodEnv;

export default environment;
