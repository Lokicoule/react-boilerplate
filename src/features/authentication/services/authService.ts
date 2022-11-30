import { ICognitoUserPoolData } from "amazon-cognito-identity-js";
import { CognitoUserAttributesBuilder } from "./providers/cognito/builders/CognitoUserAttributesBuilder";
import { CognitoUserPoolDataBuilder } from "./providers/cognito/builders/CognitoUserPoolDataBuilder";
import { CognitoClient } from "./providers/cognito/cognitoClient";

const cognitoConfig = {
  poolData: {
    UserPoolId: import.meta.env.VITE_REACT_APP_COGNITO_USER_POOL_ID,
    ClientId: import.meta.env.VITE_REACT_APP_COGNITO_USER_POOL_CLIENT_ID,
  } as ICognitoUserPoolData,
};

class AuthService {
  private cognitoClient: CognitoClient;

  constructor() {
    this.cognitoClient = new CognitoClient(
      new CognitoUserPoolDataBuilder()
        .withClientId(cognitoConfig.poolData.ClientId)
        .withUserPoolId(cognitoConfig.poolData.UserPoolId)
        //.withCookieStorage("localhost", false) // Use cookie storage for local development
        .build()
    );
  }

  public async doSignUpWithEmailAndPassword(email: string, password: string) {
    if (Boolean(this.cognitoClient.getCurrentUser())) {
      throw new Error("You are already logged in.");
    }
    await this.cognitoClient.signUp(
      email,
      password,
      new CognitoUserAttributesBuilder().add("email", email).build(),
      new CognitoUserAttributesBuilder().build()
    );
  }

  public async doSignUpConfirmation(email: string, code: string) {
    await this.cognitoClient.confirmSignUp(email, code);
  }

  public async doSendEmailVerification(email: string) {
    await this.cognitoClient.resendSignUp(email);
  }

  public async doPasswordReset(email: string) {
    await this.cognitoClient.forgotPassword(email);
  }

  public async doSubmitPasswordReset(
    email: string,
    code: string,
    password: string
  ) {
    await this.cognitoClient.forgotPasswordSubmit(email, code, password);
  }

  public async doSignInWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<string | null> {
    if (Boolean(this.cognitoClient.getCurrentUser())) {
      throw new Error("You are already logged in.");
    }
    const user = await this.cognitoClient.signIn(email, password);

    if (user) {
      return user.getAccessToken().getJwtToken();
    }

    return null;
  }

  public async doSignOut() {
    if (!Boolean(this.cognitoClient.getCurrentUser())) {
      throw new Error("You are already logged out.");
    }
    await this.cognitoClient.signOut();
  }

  public async getAccessToken(): Promise<string | null> {
    const session = await this.cognitoClient.getCurrentUserSession();
    if (!session) return null;

    return session.getAccessToken().getJwtToken();
  }

  public getCurrentUser() {
    return this.cognitoClient.getCurrentUser();
  }

  public async getDataFromIdToken(key: string): Promise<string | null> {
    const session = await this.cognitoClient.getCurrentUserSession();
    if (!session) return null;

    return session.getIdToken().decodePayload()[key];
  }
}

export const authService = new AuthService();