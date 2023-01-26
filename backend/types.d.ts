export interface Post {
  id: string;
  author: string;
  message: string;
  image: string | null;
}

export type PostWithoutId = Omit<Post, 'id'>;