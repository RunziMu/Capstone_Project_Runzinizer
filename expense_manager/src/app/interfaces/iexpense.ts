import { Icategory } from "./icategory";

export interface Iexpense {
  id: number;
  user_id: number;
  cate_id: number;
  category: Icategory;
  description: string;
  amount: number;
  expense_date: Date;
}

