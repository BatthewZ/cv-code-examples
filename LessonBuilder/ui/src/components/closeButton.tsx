type CloseButtonProps = {
  onCloseFunction: Function;
};

export const CloseButton: React.FC<CloseButtonProps> = ({onCloseFunction}: CloseButtonProps) => {
  return (
    <div
      className='closeButton'
      onClick={() => {
        onCloseFunction();
        // removeStep();
      }}
    >
      <div className='x'>X</div>
    </div>
  );
};
