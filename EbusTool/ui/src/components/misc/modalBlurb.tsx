import '../../styles/loadingModal.css';

type BlurbInfo = {
  title: string;
  content: JSX.Element;
};

export const ModalBlurb: React.FC<BlurbInfo> = ({title, content}: BlurbInfo) => {
  return (
    <div className='modalBlurb'>
      <h1>{title}</h1>
      <div className='modalBurbContent'>{content}</div>
    </div>
  );
};
