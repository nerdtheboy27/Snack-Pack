export interface SnackRecommendation {
  name: string;
  description: string;
  calories: number;
  tags: string[];
  matchReason: string;
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}