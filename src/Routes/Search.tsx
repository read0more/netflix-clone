import React from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import {
  getSearchMovie,
  getSearchTv,
  IGetMoviesResult,
  ITvResult,
} from '@/api';
import HomeSlider from '@/Components/HomeSlider';

const Banner = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
  background-size: cover;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SliderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 250px;
`;

function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get('keyword');

  const { data: movieData, isLoading: movieLoading } =
    useQuery<IGetMoviesResult | null>(['movies', 'search'], () => {
      if (keyword) {
        return getSearchMovie(keyword);
      }
      return null;
    });

  const { data: tvData, isLoading: tvLoading } = useQuery<ITvResult | null>(
    ['tv_shows', 'search'],
    () => {
      if (keyword) {
        return getSearchTv(keyword);
      }
      return null;
    }
  );

  const isLoading = movieLoading || tvLoading;

  return (
    <Banner>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <SliderWrapper>
          <HomeSlider
            title={'MOVIES'}
            items={movieData?.results ?? []}
            prefixBoxLayoutId={'movies'}
          />
          <HomeSlider
            title={'TV SHOWS'}
            items={tvData?.results ?? []}
            prefixBoxLayoutId={'tv_shows'}
            type={'tv'}
          />
        </SliderWrapper>
      )}
    </Banner>
  );
}
export default Search;
