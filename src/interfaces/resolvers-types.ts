import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Context } from './';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type ConfirmDelection = {
  __typename?: 'ConfirmDelection';
  deleted: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  deleteUser: ConfirmDelection;
  login?: Maybe<SignedUser>;
  signUp?: Maybe<SignedUser>;
};


export type MutationDeleteUserArgs = {
  user_id: Scalars['String'];
};


export type MutationLoginArgs = {
  user_email: Scalars['String'];
  user_password: Scalars['String'];
};


export type MutationSignUpArgs = {
  user_address?: InputMaybe<Scalars['String']>;
  user_avatar?: InputMaybe<Scalars['String']>;
  user_basquet?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  user_city?: InputMaybe<Scalars['String']>;
  user_confirm_email: Scalars['Boolean'];
  user_country?: InputMaybe<Scalars['String']>;
  user_email: Scalars['String'];
  user_fullname: Scalars['String'];
  user_id: Scalars['String'];
  user_password: Scalars['String'];
  user_payment_account_no?: InputMaybe<Scalars['String']>;
  user_payment_expire?: InputMaybe<Scalars['String']>;
  user_payment_method?: InputMaybe<Scalars['String']>;
  user_payment_provider?: InputMaybe<Scalars['String']>;
  user_phone?: InputMaybe<Scalars['String']>;
  user_postal_code?: InputMaybe<Scalars['String']>;
  user_roles: Array<InputMaybe<Scalars['String']>>;
};

export type PagintedUsers = {
  __typename?: 'PagintedUsers';
  maxlentgh: Scalars['Int'];
  users: Array<Maybe<User>>;
};

export type Query = {
  __typename?: 'Query';
  user?: Maybe<User>;
  users: PagintedUsers;
};


export type QueryUserArgs = {
  user_id: Scalars['String'];
};


export type QueryUsersArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  user_roles: Array<InputMaybe<Scalars['String']>>;
};

export type SignedUser = {
  __typename?: 'SignedUser';
  token: Scalars['String'];
  user: User;
};

export type User = {
  __typename?: 'User';
  createdAt?: Maybe<Scalars['Date']>;
  updatedAt?: Maybe<Scalars['Date']>;
  user_address?: Maybe<Scalars['String']>;
  user_avatar?: Maybe<Scalars['String']>;
  user_basquet?: Maybe<Array<Maybe<Scalars['String']>>>;
  user_city?: Maybe<Scalars['String']>;
  user_confirm_email: Scalars['Boolean'];
  user_country?: Maybe<Scalars['String']>;
  user_email: Scalars['String'];
  user_fullname: Scalars['String'];
  user_id: Scalars['String'];
  user_payment_account_no?: Maybe<Scalars['String']>;
  user_payment_expire?: Maybe<Scalars['String']>;
  user_payment_method?: Maybe<Scalars['String']>;
  user_payment_provider?: Maybe<Scalars['String']>;
  user_phone?: Maybe<Scalars['String']>;
  user_postal_code?: Maybe<Scalars['String']>;
  user_roles: Array<Maybe<Scalars['String']>>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  ConfirmDelection: ResolverTypeWrapper<ConfirmDelection>;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  PagintedUsers: ResolverTypeWrapper<PagintedUsers>;
  Query: ResolverTypeWrapper<{}>;
  SignedUser: ResolverTypeWrapper<SignedUser>;
  String: ResolverTypeWrapper<Scalars['String']>;
  User: ResolverTypeWrapper<User>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean'];
  ConfirmDelection: ConfirmDelection;
  Date: Scalars['Date'];
  Int: Scalars['Int'];
  Mutation: {};
  PagintedUsers: PagintedUsers;
  Query: {};
  SignedUser: SignedUser;
  String: Scalars['String'];
  User: User;
}>;

export type ConfirmDelectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ConfirmDelection'] = ResolversParentTypes['ConfirmDelection']> = ResolversObject<{
  deleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  deleteUser?: Resolver<ResolversTypes['ConfirmDelection'], ParentType, ContextType, RequireFields<MutationDeleteUserArgs, 'user_id'>>;
  login?: Resolver<Maybe<ResolversTypes['SignedUser']>, ParentType, ContextType, RequireFields<MutationLoginArgs, 'user_email' | 'user_password'>>;
  signUp?: Resolver<Maybe<ResolversTypes['SignedUser']>, ParentType, ContextType, RequireFields<MutationSignUpArgs, 'user_confirm_email' | 'user_email' | 'user_fullname' | 'user_id' | 'user_password' | 'user_roles'>>;
}>;

export type PagintedUsersResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PagintedUsers'] = ResolversParentTypes['PagintedUsers']> = ResolversObject<{
  maxlentgh?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  users?: Resolver<Array<Maybe<ResolversTypes['User']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'user_id'>>;
  users?: Resolver<ResolversTypes['PagintedUsers'], ParentType, ContextType, RequireFields<QueryUsersArgs, 'user_roles'>>;
}>;

export type SignedUserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['SignedUser'] = ResolversParentTypes['SignedUser']> = ResolversObject<{
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  user_address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user_avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user_basquet?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  user_city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user_confirm_email?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  user_country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user_email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user_fullname?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user_payment_account_no?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user_payment_expire?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user_payment_method?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user_payment_provider?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user_phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user_postal_code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user_roles?: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = Context> = ResolversObject<{
  ConfirmDelection?: ConfirmDelectionResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  PagintedUsers?: PagintedUsersResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SignedUser?: SignedUserResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
}>;

