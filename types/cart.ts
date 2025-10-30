export interface CartItem {
  product: {
    id: string | number;
    name: string;
    price: number;
    image: string;
    // tambahkan properti lain yang diperlukan
  };
  quantity: number;
}