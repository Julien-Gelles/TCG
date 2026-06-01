import { createQueryKeys } from '@lukemorales/query-key-factory';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../client/client';
import { PostListSchema, PostSchema, type Post, type PostList } from '../../types/post';

const fetchPosts = (): Promise<PostList> =>
  apiClient.get('/posts', PostListSchema);

const fetchPostById = (id: number): Promise<Post> =>
  apiClient.get(`/posts/${id}`, PostSchema);

export const postsQueryKeys = createQueryKeys('posts', {
  list: () => ({
    queryKey: ['list'],
    queryFn: () => fetchPosts(),
  }),
  detail: (id: number) => ({
    queryKey: [id],
    queryFn: () => fetchPostById(id),
  }),
});

export const useGetPosts = () => {
  return useQuery({
    ...postsQueryKeys.list(),
  });
};

export const useGetPostById = (id: number) => {
  return useQuery({
    ...postsQueryKeys.detail(id),
    enabled: id > 0,
  });
};
