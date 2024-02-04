import { useEffect, useState } from 'react';
import { useDispatch } from '../../redux';
import { openLightBox } from '../../redux/lightbox';
import sleep from '../../helper/sleep';
import classNames from 'classnames';

type Props = {
  src: string;
  index: number;
  allSrc: string[];
};

export default function ImageErrorBoundary({ src, index, allSrc }: Props) {
  const [show, setShow] = useState(false);
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();

  const handleError = () => {
    setIsError(true);
  };

  useEffect(() => {
    (async () => {
      await sleep(0);
      setShow(true);
    })();
  }, []);

  const toggleLightBox = () => {
    dispatch(openLightBox({ images: allSrc, imageIndex: index }));
  };

  if (isError) return <></>;

  return (
    <div
      className={classNames(
        { 'opacity-0': !show } +
          ' flex h-full w-full justify-center bg-gray-100 max-h-[512px]'
      )}>
      <div onClick={() => toggleLightBox()}>
        <img
          src={src}
          alt=""
          className="object-contain cursor-pointer z-50 h-full w-full"
          onError={handleError}
        />
      </div>
    </div>
  );
}
