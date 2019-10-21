import React, { useState, useEffect } from 'react';
import { useSprings, animated } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import clamp from '../../../shared/utils/clamp';
import styles from '../../assets/sass/Slider.scss';
import placeholder from '../../assets/img/placeholder.png';
import { isFirstRender } from '../../../shared/utils/functional';


const pages = [
  {
    _id: 'qw1',
    url: placeholder,
  },
  {
    _id: 'aw2',
    url: placeholder,
  },
  {
    _id: 'bw3',
    url: placeholder,
  },
];

const Slider = ({ wrapper, file }) => {
  const [data, setData] = useState(pages);
  const [index, setIndex] = useState(0);

  const handleOnDragStart = e => e.preventDefault();

  useEffect(() => {
    if (!isFirstRender(file.data)) setData(file.data.filter(d => d.kind === 'picture'));
  }, [file.data, file.loading]);

  const [props, set] = useSprings(data.length, i => ({
    x: i * wrapper.clientWidth,
    sc: 1,
    display: 'block',
  }));
  const bind = useDrag(({
    down, delta: [xDelta], direction: [xDir], distance, cancel,
  }) => {
    if (down && distance > wrapper.clientWidth / 3) {
      setIndex(clamp(index + (xDir > 0 ? -1 : 1), 0, data.length - 1));
      setIndex(clamp(index + (xDir > 0 ? -1 : 1), 0, data.length - 1));
      cancel();
    }
    set((i) => {
      if (i < index - 1 || i > index + 1) return { display: 'none' };
      const x = (i - index) * wrapper.clientWidth + (down ? xDelta : 0);
      const sc = down ? 1 - distance / wrapper.clientWidth / 2 : 1;
      return { x, sc, display: 'block' };
    });
  });
  return props.map(({ x, display, sc }, i) => (
    <animated.div
      className={styles.slider}
      {...bind()}
      key={data[i]._id}
      style={{
        display,
        transform: x.interpolate(_x => `translate3d(${_x}px,0,0)`),
        opacity: !isFirstRender(file.data) ? 1 : 0.6,
      }}
    >
      <animated.div
        onDragStart={handleOnDragStart}
        style={{ transform: sc.interpolate(s => `scale(${s})`), backgroundImage: `url(${data[i].url})` }}
      />
    </animated.div>
  ));
};

export default Slider;
