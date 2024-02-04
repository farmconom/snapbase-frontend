import { PropsWithChildren } from 'react';
import { ToastContainer } from 'react-toastify';

export default function Toastify({ children }: PropsWithChildren) {
  return (
    <>
      {children}
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}
