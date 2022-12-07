type text = {
  text: string;
};

export const ShimmerText: React.FC<text> = ({text}: text) => {
  function makeShimmerText() {
    let startingInterval = 0;

    return Array.from(text).map((char) => {
      startingInterval += 0.3;
      return (
        <div
          className='shimmer'
          style={{animationDelay: startingInterval + 's'}}
          key={'shimmerText' + startingInterval}
        >
          <strong>
            {char}
            {char === ' ' ? <div style={{marginInline: '.2em'}} /> : ''}
          </strong>
        </div>
      );
    });
  }

  return (
    <div className='row centerChildren'>
      <div className='row'>{makeShimmerText()}</div>
    </div>
  );
};
