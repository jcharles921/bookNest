interface Book {
  id?: number;
  name: string;
  author: string;
  image: string;
  read: boolean;
  createdAt: string;
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

interface UpdateBookState {
  loading: boolean;
  error: boolean | string;
  success: boolean;
  message: string;
}

interface DeleteBookState {
  loading: boolean;
  error: boolean | string;
  success: boolean;
  message: string;
}
interface Preference {
  id?: string | number;
  sortingOrder?: string;
  preferredTheme: string;
}

interface AddPreferenceState {
  loading: boolean;
  error: boolean | string;
  success: boolean;
  message: string;
}

interface FetchPreferencesState {
  loading: boolean;
  error: boolean | string;
  success: boolean;
  message: string;
  data: Preference;
}

interface UpdatePreferenceState {
  loading: boolean;
  error: boolean | string;
  success: boolean;
  message: string;
}

interface DeletePreferenceState {
  loading: boolean;
  error: boolean | string;
  success: boolean;
  message: string;
}
