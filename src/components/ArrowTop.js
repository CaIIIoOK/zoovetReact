import React from 'react';

const ArrowTop = () => {
  const arrowRef = React.useRef();
  function onpointerdown() {
    window.scroll(0, 0);
  }

  React.useEffect(() => {
    document.addEventListener('scroll', function () {
      let b = document.documentElement.getBoundingClientRect().bottom;
      if (b < 0) {
        arrowRef.current.style.visibility = 'visible';
      } else {
        arrowRef.current.style.visibility = 'hidden';
      }
    });
  }, []);

  return (
    <div ref={arrowRef} id="arrowTop" onClick={() => onpointerdown()}>
      <i className="fas fa-chevron-circle-up"></i>
    </div>
  );
};

export default ArrowTop;
