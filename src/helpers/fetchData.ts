import { Albums } from "../types/Albums";
import { Post } from "../types/Post";
import { User } from "../types/User";

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch(`${BASE_URL}/users`);

    if (!response.ok) {
      throw new Error('Error: Unable to get users');
    }

    const data: User[] = await response.json();

    return data;
  } catch (error) {
    console.error('Error fetching users');
    throw error;
  }
};

export const getPosts = async (userId: number): Promise<Post[]> => {
  try {
    const response = await fetch(`${BASE_URL}/users/${userId}/posts`);

    if (!response.ok) {
      throw new Error('Error: Unable to get posts');
    }

    const data: Post[] = await response.json();

    return data;
  } catch (error) {
    console.error('Error fetching posts');
    throw error;
  }
}

export const getAlbums = async (userId: number): Promise<Albums[]> => {
  try {
    const response = await fetch(`${BASE_URL}/users/${userId}/albums`);

    if (!response.ok) {
      throw new Error('Error: Unable to get albums');
    }

    const data: Albums[] = await response.json();

    return data;
  } catch (error) {
    console.error('Error fetching albums');
    throw error;
  }
}