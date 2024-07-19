interface Book {
  id?: number;
  name: string;
  author: string;
  image: string;
  read: boolean;
  createdAt: number;
  rating: number;
}
interface CreateBookState {
  loading: boolean;
  error: boolean | string;
  success: boolean;
  message: string;
  data: any;
}
interface FetchBooksState {
    loading: boolean;
    error: boolean | string;
    success: boolean;
    message: string;
    data: any[];
  }