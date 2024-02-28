type Props = {
  onShow: boolean;
  text: string;
};

export default function GenerateErrorText({ text, onShow }: Props) {
  return (
    <span
      className={
        (onShow ? 'h-[20px]' : 'h-[1px]') +
        ' !mt-2 !text-sm w-full text-start !text-red-500 overflow-hidden transition-all'
      }>
      {text}
    </span>
  );
}
