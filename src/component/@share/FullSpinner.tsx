import { ProgressSpinner } from 'primereact/progressspinner';

type props = {
  isInPage?: boolean;
};
export default function FullSpinner({ isInPage }: props) {
  return (
    <div
      className={
        (isInPage ? 'min-h-[82vh]' : 'min-h-[100vh]') +
        ' flex items-center justify-center'
      }>
      <ProgressSpinner />{' '}
    </div>
  );
}
