import { PropsWithChildren } from 'react';
import Lightbox from 'react-18-image-lightbox';
import { useDispatch, useSelector } from '../redux';
import {
  closeLightBox,
  onMoveNextLightBoxImage,
  onMovePrevLightBoxImage,
} from '../redux/lightbox';
import VideoErrorBoundary from '../component/@share/VideoErrorBoundary';

export default function LightboxPortal({ children }: PropsWithChildren) {
  const dispatch = useDispatch();
  const { images, imageIndex } = useSelector(state => state.lightBox);

  const onMovePrevRequest = () => {
    dispatch(onMovePrevLightBoxImage());
  };

  const onMoveNextRequest = () => {
    dispatch(onMoveNextLightBoxImage());
  };

  const onCloseRequest = () => {
    dispatch(closeLightBox());
  };

  return (
    <>
      {children}
      {!!images.length && (
        <Lightbox
          enableZoom={false}
          mainSrc={images[imageIndex]}
          nextSrc={images[(imageIndex + 1) % images.length]}
          prevSrc={images[(imageIndex + images.length - 1) % images.length]}
          onCloseRequest={onCloseRequest}
          onMovePrevRequest={onMovePrevRequest}
          onMoveNextRequest={onMoveNextRequest}
          imageLoadErrorMessage={
            <VideoErrorBoundary src={images[imageIndex]} />
          }
        />
      )}
    </>
  );
}
