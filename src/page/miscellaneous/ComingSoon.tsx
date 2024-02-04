import NoneActiveFeature from "../../component/@share/NoneActiveFeature";

type Props = {
  title: string;
  description?: string;
};

export default function ComingSoon({ title, description }: Props) {
  return (
    <>
      <h3 className="mb-2 text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 max-sm:px-3">
        {title}
      </h3>
      {!!description && (
        <p className="text-gray-500 font-normal text-xs sm:text-sm max-sm:px-3">
          {description}
        </p>
      )}
      <div className={'my-5'}>
        <NoneActiveFeature />
      </div>
    </>
  );
}
