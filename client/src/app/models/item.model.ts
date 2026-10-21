export interface Item {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

export type ItemCreateInput = Omit<Item, 'id'>;
export type ItemUpdateInput = Partial<ItemCreateInput>;
