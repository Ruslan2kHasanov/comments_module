export type TComment = {
  id: string;
  author_id: string;
  text: string;
  date_create: Date;
  rating: number;
};

export type TCommentRaw = Omit<TComment, 'date_create'> & {
  date_create: Date;
};

export type TCommentsUserChanged = {
  id_comment: string;
  rating_val: -1 | 1;
};
