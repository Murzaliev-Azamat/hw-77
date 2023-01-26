import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from '../../axiosApi';
import { Post, PostApi } from '../../../types';

export const fetchPosts = createAsyncThunk<Post[]>(
  'posts/fetchAll',
  async () => {
    const postsResponse = await axiosApi.get<Post[]>('/posts');
    const posts = postsResponse.data;

    return posts;
  }
);

export const addPost = createAsyncThunk<void, PostApi>(
  'posts/decodeMessage',
  async (post) => {
    const formData = new FormData();

    const keys = Object.keys(post) as (keyof PostApi)[];
    keys.forEach(key => {
      const value = post[key];

      if (value !== null) {
        formData.append(key, value);
      }
    });

    await axiosApi.post<PostApi>('/posts', formData);
  }
);
//
// export const fetchContacts = createAsyncThunk<Contact[]>(
//   'contacts/fetchAll',
//   async () => {
//     const contactsResponse = await axiosApi.get<ContactsApiList | null>('/contacts.json');
//     const contacts = contactsResponse.data;
//     if (contacts === null) {
//       return [];
//     } else {
//       return Object.keys(contacts).map(key => {
//         const contact = contacts[key];
//         return {
//           ...contact,
//           id: key
//         }
//       });
//     }
//   },
// )