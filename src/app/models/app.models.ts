export interface HackerNewsPost {
  by: string;
  descendants: number;
  id: number;
  kids?: number[];
  score: number;
  time: number;
  title: string;
  type: 'job' | 'story' | 'comment' | 'poll' | 'pollopt';
  url?: string;
  text?: string;
  dead?: boolean;
  deleted?: boolean;
}

export interface FooterLink {
  label: string;
  url?: string;
}
