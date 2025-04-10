// types.ts
export type StackParamList = {
  Home: undefined;
  Login: undefined;
  CreateAccount: undefined;
  CreateUsernamePassword: { email: string };
  CreateProfile: { email: string; username: string };
  MainScreen: { username: string; email: string; tags: string; bio: string };
};

  