import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Mutation = {
  __typename?: 'Mutation';
  addOrder: Order;
  addProduct: Product;
  removeProduct: Scalars['Boolean']['output'];
};


export type MutationAddOrderArgs = {
  newOrderData: NewOrderInput;
};


export type MutationAddProductArgs = {
  newProductData: NewProductInput;
};


export type MutationRemoveProductArgs = {
  id: Scalars['Float']['input'];
};

export type NewOrderInput = {
  category: Scalars['String']['input'];
  date: Scalars['String']['input'];
  description: Scalars['String']['input'];
  image: Scalars['String']['input'];
  location: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  title: Scalars['String']['input'];
};

export type NewProductInput = {
  category: Scalars['String']['input'];
  date: Scalars['String']['input'];
  description: Scalars['String']['input'];
  image: Scalars['String']['input'];
  location: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  title: Scalars['String']['input'];
};

export type Order = {
  __typename?: 'Order';
  date: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  items: Array<OrderItem>;
  lastName: Scalars['String']['output'];
};

export type OrderItem = {
  __typename?: 'OrderItem';
  bundleItems: Array<OrderItem>;
  id: Scalars['Float']['output'];
  order: Order;
  parentOrderItem: OrderItem;
  product: Product;
};

export type Product = {
  __typename?: 'Product';
  category: Scalars['String']['output'];
  date: Scalars['String']['output'];
  description: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  image: Scalars['String']['output'];
  location: Scalars['String']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
};

export type Query = {
  __typename?: 'Query';
  order: Order;
  orders: Array<Order>;
  product: Product;
  products: Array<Product>;
};


export type QueryOrderArgs = {
  id: Scalars['Float']['input'];
};


export type QueryOrdersArgs = {
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
};


export type QueryProductArgs = {
  id: Scalars['Float']['input'];
};


export type QueryProductsArgs = {
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
};
