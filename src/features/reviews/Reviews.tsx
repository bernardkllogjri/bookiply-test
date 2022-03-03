import { useEffect, useRef } from 'react';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { reviewAsyncGet, selectReviews, resetFilters, setFilters } from './reviewSlice';
import { Card, Container, Header } from 'components';
import { IReview } from './types';
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import InfiniteScroll from 'react-infinite-scroller';
import Select from 'react-select'

import './Reviews.css'
import { buildRequest } from 'utils/buildRequest';

const options = [
  { value: 'score', label: 'Score' },
  { value: 'channel', label: 'Channels' },
]

export const Reviews = () => {
  const reviews = useAppSelector(selectReviews);
  const scrollEl: React.Ref<HTMLDivElement> = useRef(null);
  const dispatch = useAppDispatch();

  const fetch = () => {
    if (reviews.filter && reviews.query) {
      dispatch(reviewAsyncGet(buildRequest({
        _limit: reviews.limit,
        _page: reviews.page,
        [`${reviews.filter}_like`]: reviews.query
      })))
      return
    }

    dispatch(reviewAsyncGet(buildRequest({
      limit: reviews.limit,
      page: reviews.page,
    })))
  }

  const fetchFilter = () => {
    if (!reviews.filter || !reviews.query) return
    dispatch(resetFilters())
    dispatch(reviewAsyncGet(
      buildRequest({
        _limit: reviews.limit,
        _page: 1,
        [`${reviews.filter}_like`]: reviews.query
      })
    ))
  }

  useEffect(() => {
    fetch()
  }, [])

  return (
    <Container>
      <Header />
      <h3 className='header__container_id'>ID: 091021</h3>
      <h1 className='header__container_title'>La Casa de las Flores</h1>
      <div className='main__content' ref={scrollEl}>
        {!!(reviews.data && reviews.data.length) && (
          <>
            <div className='main__content_title_container'>
              <h1 className='main__content_title'>{reviews.totalCount} Reviews</h1>
              <div className='main__content_title_filter'>
                <Select placeholder='Filter by' options={options} onChange={(e) => dispatch(setFilters({ filter: e?.value }))} />
                <input name='query' onChange={(e) => dispatch(setFilters({ query: e?.target.value }))} />
                <button onClick={fetchFilter}>Go</button>
              </div>
            </div>
            <InfiniteScroll
              pageStart={0}
              loadMore={() => { reviews.status != 'loading' && fetch() }}
              hasMore={reviews.data.length < reviews.totalCount}
              loader={<AiOutlineLoading3Quarters className='main__content_loader' />}
            >
              {(reviews.data.map((rev: IReview, ix: number) => (
                <Card key={`${ix}-${rev.publishedAt}`} {...rev} />
              )))}
            </InfiniteScroll>
          </>
        )}
      </div>
    </Container>
  );
}

export default Reviews