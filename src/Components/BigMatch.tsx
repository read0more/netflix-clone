import React from 'react';
import { getMovieDetail, getTvDetail, IMovieDetail, ITvDetail } from '@/api';
import { motion, useScroll } from 'framer-motion';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { makeImagePath } from '@/utils';

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 46px;
  position: relative;
  top: -80px;
`;

const BigOverview = styled.p`
  padding: 20px;
  position: relative;
  top: -80px;
  color: ${(props) => props.theme.white.lighter};
`;

const Chip = styled(motion.div)`
  padding: 10px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.black.veryDark};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
`;

export default function BigMatch({
  id,
  type = 'movies',
}: {
  id: string;
  type?: 'movies' | 'tv';
}) {
  const history = useHistory();
  const { scrollY } = useScroll();
  const onOverlayClick = () => history.push(type === 'movies' ? '/' : '/tv');
  const { data, isLoading } = useQuery<IMovieDetail | ITvDetail | null>(
    [type === 'movies' ? 'movies' : 'tv', 'detail', id],
    () => {
      if (id) {
        return type === 'movies' ? getMovieDetail(id) : getTvDetail(id);
      }
      return null;
    }
  );

  let itemTitle = '';
  if (type === 'movies') {
    itemTitle = (data as IMovieDetail)?.title;
  } else {
    itemTitle = (data as ITvDetail)?.name;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Overlay
        onClick={onOverlayClick}
        exit={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
      <BigMovie style={{ top: scrollY.get() + 100 }} layoutId={id}>
        {data && (
          <>
            <BigCover
              style={{
                backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                  data.backdrop_path,
                  'w500'
                )})`,
              }}
            />
            <BigTitle>{itemTitle}</BigTitle>
            <BigOverview>{data.overview || 'No data...'}</BigOverview>
            <div style={{ display: 'flex', gap: '10px', margin: '0 10px' }}>
              {data.genres &&
                data.genres.map((genre) => (
                  <Chip key={genre.id} layoutId={`genre-${genre.id}`}>
                    {genre.name}
                  </Chip>
                ))}
            </div>
          </>
        )}
      </BigMovie>
    </>
  );
}
