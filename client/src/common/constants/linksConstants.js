export const linksConstants = {
  pages: [
    {
      name: 'Home',
      linkTo: '/',
      public: true,
    },
    {
      name: 'Sign In',
      linkTo: '/signin',
      public: true,
    },
    {
      name: 'Sign Up',
      linkTo: '/signup',
      public: true,
    },
    {
      name: 'Profile',
      public: false,
    },
    {
      name: 'Sign Out',
      linkTo: '/',
      public: false,
    },
    {
      name: 'Create Post',
      linkTo: '/create-post',
      public: false,
    },
  ],
};
