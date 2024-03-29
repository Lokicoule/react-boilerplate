import React, { useContext, useState } from "react";
import { AuthUser } from "~/features/auth";
import { AsyncState, useAsyncCallback } from "~/hooks/useAsyncCallback";
import {
  forgotPassword,
  forgotPasswordSubmit,
  login,
  logout,
  register,
  registerConfirmation,
  getAuthenticatedUser,
} from "~/libs/auth";

type AuthContextType = {
  user?: AuthUser;
  isLoggedIn: boolean;
  useLogin: () => [
    AsyncState,
    (email: string, password: string) => Promise<void>
  ];
  logout: () => Promise<void>;
  useRegister: () => [
    AsyncState,
    (email: string, password: string) => Promise<void>
  ];
  useRegisterConfirmation: () => [
    AsyncState,
    (email: string, code: string) => Promise<void>
  ];
  useForgotPassword: () => [AsyncState, (email: string) => Promise<void>];
  useForgotPasswordSubmit: () => [
    AsyncState,
    (email: string, code: string, password: string) => Promise<string>
  ];
};

const AuthContext = React.createContext<AuthContextType>({
  isLoggedIn: false,
  useLogin: () => [
    { isLoading: false, error: undefined },
    () => Promise.resolve(),
  ],
  logout: () => Promise.resolve(),
  useRegister: () => [
    { isLoading: false, error: undefined },
    () => Promise.resolve(),
  ],
  useRegisterConfirmation: () => [
    { isLoading: false, error: undefined },
    () => Promise.resolve(),
  ],
  useForgotPassword: () => [
    { isLoading: false, error: undefined },
    () => Promise.resolve(),
  ],
  useForgotPasswordSubmit: () => [
    { isLoading: false, error: undefined },
    () => Promise.resolve(""),
  ],
} satisfies AuthContextType);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FunctionComponent<React.PropsWithChildren> = (
  props
) => {
  const { children } = props;

  const [user, setUser] = useState<AuthUser | undefined>(undefined);

  const handleLogin = async (email: string, password: string) => {
    const user = await login(email, password);
    const decodedPayload = user.getAccessToken().decodePayload();
    const groups = decodedPayload["cognito:groups"];
    const username = decodedPayload["sub"];

    setUser({ username, email, groups });
  };

  const handleLogout = async () => {
    logout().then(() => {
      setUser(undefined);
      window.location.assign(window.location.origin as unknown as string);
    });
  };

  const value = {
    isLoggedIn: Boolean(getAuthenticatedUser()),
    user,
    useLogin: () => useAsyncCallback(handleLogin),
    logout: handleLogout,
    useRegister: () =>
      useAsyncCallback(async (email: string, password: string) =>
        register(email, password)
      ),
    useRegisterConfirmation: () =>
      useAsyncCallback(async (email: string, code: string) =>
        registerConfirmation(email, code)
      ),
    useForgotPassword: () =>
      useAsyncCallback(async (email: string) => forgotPassword(email)),
    useForgotPasswordSubmit: () =>
      useAsyncCallback(async (email: string, code: string, password: string) =>
        forgotPasswordSubmit(email, code, password)
      ),
  };

  return (
    <AuthContext.Provider value={value} {...props}>
      {children}
    </AuthContext.Provider>
  );
};
