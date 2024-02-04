import LockIcon from '../../assets/icon/LockIcon';

function NoneActiveFeature() {
  return (
    <>
      <div className={'w-full p-4 flex flex-col items-center text-center'}>
        <LockIcon />
        <p className={'text-gray-400 text-sm mt-5'}>
          This feature is not available at the moment, will be launched soon.
        </p>
      </div>
    </>
  );
}

export default NoneActiveFeature;
