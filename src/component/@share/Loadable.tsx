import { Suspense, LazyExoticComponent } from 'react';
import FullSpinner from './FullSpinner';

/* eslint-disable @typescript-eslint/no-explicit-any */
const Loadable = (Component: LazyExoticComponent<() => JSX.Element>) => {
  const LoadableComponent = (props: any) => (
    <Suspense fallback={<FullSpinner isInPage />}>
      <Component {...props} />
    </Suspense>
  );

  return LoadableComponent;
};

export default Loadable;
