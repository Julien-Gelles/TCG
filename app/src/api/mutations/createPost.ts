import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { apiClient } from '../client/client';
import { PostSchema, type CreatePostPayload, type Post } from '../../types/post';
import { postsQueryKeys } from '../queries/getPosts';

const createPost = (payload: CreatePostPayload): Promise<Post> =>
  apiClient.post('/posts', PostSchema, payload);

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,
    onSuccess: (data) => {
      toast.success(`Post "${data.title}" créé avec succès`);
      queryClient.invalidateQueries({ queryKey: postsQueryKeys.list().queryKey });
    },
  });
};
