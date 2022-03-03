export type IReviewFields = 'author'
 | 'channel'
 | 'comment'
 | 'headline'
 | 'negativeFeedback'
 | 'positiveFeedback'
 | 'publishedAt'
 | 'score'

export type IReview = {
  author: string,
  channel: "AIRBNB" | "HOLIDU" | "BOOKINGCOM"
  comment: string,
  headline: string
  negativeFeedback?: null
  positiveFeedback?: string
  publishedAt: string
  score: number
}

export interface ReviewsState {
  data: IReview[],
  status: 'idle' | 'loading',
  page: number,
  limit: number,
  totalCount: number,
  query: string,
  filter: string
}