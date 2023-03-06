import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';
import { IMovie, ITv } from '@/api';
import { useHistory } from 'react-router-dom';
import { makeImagePath } from '@/utils';

const Slider = styled.div`
  position: relative;
  top: -100px;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-color: white;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
  font-size: 66px;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  max-width: 300px;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const NextButton = styled(motion.button)`
  position: absolute;
  right: 20px;
  top: 0;
  width: 50px;
  height: 50px;
  border-radius: 3px;
  background-color: ${(props) => props.theme.black.lighter};
  color: white;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const rowVariants = {
  hidden: {
    x: window.outerWidth + 5,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - 5,
  },
};

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -80,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: 'tween',
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: 'tween',
    },
  },
};

const offset = 6;

interface Props {
  title: string;
  items: IMovie[] | ITv[];
  prefixBoxLayoutId: string;
  type?: 'movies' | 'tv';
  showNextButton?: boolean;
}

export default function HomeSlider({
  title,
  items,
  prefixBoxLayoutId,
  type = 'movies',
  showNextButton = true,
}: Props) {
  const history = useHistory();
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);

  const toggleLeaving = () => setLeaving((prev) => !prev);

  const onBoxClicked = (movieId: number) => {
    history.push(`/${type}/${movieId}`);
  };

  const incraseIndex = () => {
    if (items.length) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = items.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  return (
    <Slider>
      <h2>{title}</h2>
      <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
        <Row
          variants={rowVariants}
          initial='hidden'
          animate='visible'
          exit='exit'
          transition={{ type: 'tween', duration: 1 }}
          key={index}
        >
          {items.slice(offset * index, offset * index + offset).map((item) => {
            let itemTitle = '';
            if (type === 'movies') {
              itemTitle = (item as IMovie).title;
            } else {
              itemTitle = (item as ITv).name;
            }

            return (
              <Box
                layoutId={`${prefixBoxLayoutId}_${item.id}`}
                key={item.id}
                whileHover='hover'
                initial='normal'
                variants={boxVariants}
                onClick={() => onBoxClicked(item.id)}
                transition={{ type: 'tween' }}
                bgPhoto={makeImagePath(item.backdrop_path, 'w500')}
              >
                <Info variants={infoVariants}>
                  <h4>{itemTitle}</h4>
                </Info>
              </Box>
            );
          })}
        </Row>
      </AnimatePresence>
      {showNextButton && <NextButton onClick={incraseIndex}>NEXT</NextButton>}
    </Slider>
  );
}
