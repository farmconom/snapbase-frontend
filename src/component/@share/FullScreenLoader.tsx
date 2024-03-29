import CircularProgress from '@mui/material/CircularProgress';

export default function FullScreenLoader() {
  return (
    <div className="fixed flex items-center top-0 left-0 z-50 justify-center w-full h-full bg-slate-600 bg-opacity-50">
      <div className="flex justify-center items-center space-x-1 text-sm text-gray-700">
        <CircularProgress />{' '}
      </div>
    </div>
  );
}
