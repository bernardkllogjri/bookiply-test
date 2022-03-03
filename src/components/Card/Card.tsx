import * as React from 'react';
import { IReview } from 'features/reviews/types';
import { Tag } from '../__common/Tag/Tag';
import './Card.css';
import {
  booking,
  holidu,
  airbnb
} from 'assets/'
import dayjs from 'dayjs';

const channelsEnum = {
  BOOKINGCOM: booking,
  HOLIDU: holidu,
  AIRBNB: airbnb,
}

export const Card: React.FC<IReview> = ({ channel, headline, comment, author, publishedAt, score }) => {
  return (
    <div className='card__container'>
      <div className='card__heading_container'>
        <Tag score={score} />
        <img src={channelsEnum[channel]} alt='Channel' />
      </div>
      <div className='card__content_title'>
        {headline}
      </div>
      <div className='card__content_comment'>
        {comment}
      </div>
      <div className='card__author_container'>
        <div className="card__author_name">{author}</div>
        <span className="card__author_reviewed">Reviewed: {dayjs(publishedAt).format('DD MMMM YYYY')}</span>
      </div>

    </div>
  )
}

export default Card