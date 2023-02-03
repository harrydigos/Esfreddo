export type Order = {
  id: string;
  user_id: string | null;
  bought_products_id: string[] | null;
  date: Date | null;
};
