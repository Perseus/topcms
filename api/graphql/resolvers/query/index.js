import { users, me, logout } from './user';
import { gameStats, staffStatuses } from './game';
import { newsArticles, authors, downloads, newsArticle, newsFeed } from './site';

export const Query = {
  users,
  me,
  logout,
  gameStats,
  newsArticles,
  authors,
  downloads,
  newsArticle,
  newsFeed,
  staffStatuses
};
