import { Outlet } from 'react-router-dom';
import classNames from 'classnames';
import FullScreenLoader from '../component/@share/FullScreenLoader';
import Navbar from './Navbar';
import { useSelector } from '../redux';

export default function AppLayout() {
  const { isShowLoader } = useSelector(state => state.layout);

  return (
    <>
      <Navbar />
      <div className="flex items-start">
        <main
          id="app-main"
          className={classNames(
            'overflow-y-auto relative w-full h-full bg-gray-200 dark:bg-gray-900 pt-[1.5rem] sm:py-[2rem] px-0 sm:px-[16px] lg:px-[2rem]'
          )}>
          <div className="min-h-[82vh] md:max-w-[700px] lg:max-w-[1100px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
      {isShowLoader && <FullScreenLoader />}
    </>
  );
}
