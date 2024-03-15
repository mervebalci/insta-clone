import { create } from "zustand";

const useUserProfileStore = create((set) => ({
  userProfile: null,
  setUserProfile: (userProfile) => set({ userProfile }),

  // To update the number of posts in the profile page after a post is added
  addPost: (post) => set((state) => ({
    userProfile: {...state.userProfile, posts: [post.id, ...state.userProfile.posts]}
  })),

  // To update the number of posts in the profile page after a post is deleted
  deletePost: (postId) => set((state) => ({
    userProfile: {
      ...state.userProfile,
      posts: state.userProfile.posts.filter((id) => id !== postId),
    }
  }))
}));

export default useUserProfileStore;