import React from 'react';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { AnimatePresence } from 'framer-motion';
import {
  getLatestMovie,
  getMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  IGetMoviesResult,
  IMovie,
} from '../api';
import { makeImagePath } from '../utils';
import { useRouteMatch } from 'react-router-dom';
import HomeSlider from '@/Components/HomeSlider';
import BigMatch from '@/Components/BigMatch';

const Wrapper = styled.div`
  background: black;
  color: white;
  padding-bottom: 200px;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 30px;
  width: 50%;
`;

const SliderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 250px;
`;

function Home() {
  const bigMovieMatch = useRouteMatch<{ movieId: string }>('/movies/:movieId');
  const { data: nowPlayingData, isLoading: nowPlayingLoading } =
    useQuery<IGetMoviesResult>(['movies', 'nowPlaying'], getMovies);

  const { data: latestData, isLoading: latestLoading } = useQuery<IMovie>(
    ['movies', 'latest'],
    getLatestMovie
  );

  const { data: topRatedData, isLoading: topRatedLoading } =
    useQuery<IGetMoviesResult>(['movies', 'top_rated'], getTopRatedMovies);

  const { data: upcomingData, isLoading: upcomingLoading } =
    useQuery<IGetMoviesResult>(['movies', 'upcoming'], getUpcomingMovies);

  const isLoading =
    nowPlayingLoading || latestLoading || topRatedLoading || upcomingLoading;
  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bgPhoto={makeImagePath(
              nowPlayingData?.results[0].backdrop_path || ''
            )}
          >
            <Title>{nowPlayingData?.results[0].title}</Title>
            <Overview>{nowPlayingData?.results[0].overview}</Overview>
          </Banner>
          <SliderWrapper>
            <HomeSlider
              title={'NOW PLAYING'}
              items={nowPlayingData?.results.slice(1) ?? []}
              prefixBoxLayoutId={'now'}
            />
            <HomeSlider
              title={'LATEST MOVIE'}
              items={latestData ? [latestData] : []}
              prefixBoxLayoutId={'latest'}
              showNextButton={false}
            />
            <HomeSlider
              title={'TOP RATED'}
              items={topRatedData?.results ?? []}
              prefixBoxLayoutId={'top_lated'}
            />
            <HomeSlider
              title={'UPCOMING'}
              items={upcomingData?.results ?? []}
              prefixBoxLayoutId={'upcoming'}
            />
          </SliderWrapper>
          <AnimatePresence>
            {bigMovieMatch ? (
              <BigMatch id={bigMovieMatch.params.movieId} />
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}
export default Home;
