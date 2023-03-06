import React from 'react';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { AnimatePresence } from 'framer-motion';
import {
  getTvAiringToday,
  getTvLatest,
  getTvPopular,
  getTvTopRated,
  ITv,
  ITvResult,
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

function Tv() {
  const bigTvMatch = useRouteMatch<{ tvId: string }>('/tv/:tvId');
  const { data: airingTodayData, isLoading: nowPlayingLoading } =
    useQuery<ITvResult>(['tvs', 'airing'], getTvAiringToday);

  const { data: latestData, isLoading: latestLoading } = useQuery<ITv>(
    ['tvs', 'latest'],
    getTvLatest
  );

  const { data: popularData, isLoading: upcomingLoading } = useQuery<ITvResult>(
    ['tvs', 'popular'],
    getTvPopular
  );

  const { data: topRatedData, isLoading: topRatedLoading } =
    useQuery<ITvResult>(['tvs', 'top_rated'], getTvTopRated);

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
              airingTodayData?.results[0].backdrop_path || ''
            )}
          >
            <Title>{airingTodayData?.results[0].name}</Title>
            <Overview>{airingTodayData?.results[0].overview}</Overview>
          </Banner>
          <SliderWrapper>
            <HomeSlider
              title={'LATEST MOVIE'}
              items={latestData ? [latestData] : []}
              prefixBoxLayoutId={'latest'}
              showNextButton={false}
              type={'tv'}
            />
            <HomeSlider
              title={'AIRING TODAY'}
              items={airingTodayData?.results.slice(1) ?? []}
              prefixBoxLayoutId={'airing_today'}
              type={'tv'}
            />
            <HomeSlider
              title={'POPULAR'}
              items={popularData?.results ?? []}
              prefixBoxLayoutId={'popular'}
              type={'tv'}
            />
            <HomeSlider
              title={'TOP RATED'}
              items={topRatedData?.results ?? []}
              prefixBoxLayoutId={'top_rated'}
              type={'tv'}
            />
          </SliderWrapper>
          <AnimatePresence>
            {bigTvMatch ? (
              <BigMatch id={bigTvMatch.params.tvId} type={'tv'} />
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}
export default Tv;
