export interface Iexpense {
  id: number;
  user_id: number;
  cate_id: number;
  // expense_cate_name: string;
  description: string;
  amount: number;
  expense_date: Date;
}

