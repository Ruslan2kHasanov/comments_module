export type TComment = {
  id: string;
  author_id: string;
  text: string;
  date_create: Date;
  rating: number;
  reply_to_id?: string | null;
};
