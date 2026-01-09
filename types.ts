export interface Tool {
  id: string;
  icon: string;
  title: string;
  description: string;
  path: string;
  isReady: boolean;
}

export enum CalculationType {
  MARGIN = 'MARGIN',
  MARKUP = 'MARKUP'
}