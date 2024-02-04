import classNames from 'classnames';
import { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import sleep from '../../helper/sleep';

type Props = {
  src: string;
};

export default function VideoErrorBoundary({ src }: Props) {
  const [isError, setIsError] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    (async () => {
      await sleep(500);
      setShow(true);
    })();
  }, []);

  const handleError = () => {
    setIsError(true);
  };

  if (isError) return <></>;

  return (
    <div className={classNames({ 'opacity-0': !show })}>
      <ReactPlayer
        url={src}
        width="100%"
        height="100%"
        controls
        onError={handleError}
      />
    </div>
  );
}
