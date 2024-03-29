import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { fetchData } from '../../../libs/graphql-fetcher';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  _Any: any;
  _FieldSet: any;
  link__Import: any;
};

export type AddressDto = {
  __typename?: 'AddressDto';
  additionalAddress?: Maybe<Scalars['String']>;
  address: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  zipCode: Scalars['String'];
};

export type AddressInput = {
  additionalAddress?: InputMaybe<Scalars['String']>;
  address: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  zipCode: Scalars['String'];
};

export type CompanyDto = {
  __typename?: 'CompanyDto';
  createdAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  rcsNumber: Scalars['String'];
  sirenNumber: Scalars['String'];
  siretNumber: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  vatNumber: Scalars['String'];
};

export type CompanyInput = {
  id?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  rcsNumber: Scalars['String'];
  sirenNumber: Scalars['String'];
  siretNumber: Scalars['String'];
  vatNumber: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser?: Maybe<UserDto>;
  updateUser: UserDto;
};


export type MutationCreateUserArgs = {
  createUserInput: UserCreateInput;
};


export type MutationUpdateUserArgs = {
  updateUserInput: UserUpdateInput;
};

export type Query = {
  __typename?: 'Query';
  _entities: Array<Maybe<_Entity>>;
  _service: _Service;
  getAuthenticatedUser?: Maybe<UserDto>;
};


export type Query_EntitiesArgs = {
  representations: Array<Scalars['_Any']>;
};

export type UserCreateInput = {
  address?: InputMaybe<AddressInput>;
  company?: InputMaybe<CompanyInput>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  phone: Scalars['String'];
};

export type UserDto = {
  __typename?: 'UserDto';
  address?: Maybe<AddressDto>;
  company?: Maybe<CompanyDto>;
  createdAt?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
  phone: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type UserUpdateInput = {
  address?: InputMaybe<AddressInput>;
  company?: InputMaybe<CompanyInput>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['String'];
  lastName: Scalars['String'];
  phone: Scalars['String'];
};

export type _Entity = UserDto;

export type _Service = {
  __typename?: '_Service';
  sdl?: Maybe<Scalars['String']>;
};

export type CreateUserMutationVariables = Exact<{
  createUserInput: UserCreateInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser?: { __typename?: 'UserDto', email: string, id: string } | null };


export const CreateUserDocument = `
    mutation CreateUser($createUserInput: UserCreateInput!) {
  createUser(createUserInput: $createUserInput) {
    email
    id
  }
}
    `;
export const useCreateUserMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateUserMutation, TError, CreateUserMutationVariables, TContext>) =>
    useMutation<CreateUserMutation, TError, CreateUserMutationVariables, TContext>(
      ['CreateUser'],
      (variables?: CreateUserMutationVariables) => fetchData<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, variables)(),
      options
    );