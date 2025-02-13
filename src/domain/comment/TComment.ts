export type TComment = {
  id: number;
  author_id: number;
  text: string;
  date_create: Date;
  rating: number;
  reply_to_id?: number | null;
};
