export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface AuthForm {
  username: string,
  password: string,
}

export interface HeaderLinks {
  title: string,
  link: string,
  icon: string
}

export interface IOrdersResponse {
  addition: Array<IAddition>
  clientName: string
  clientPhone: string
  contractId: number
  createdDate: string
  customPrice: string
  door: IDoor
  doorArea: string
  doorLength: string
  doorPrice: string
  doorWidth: string
  id: string
  periodDate: string[]
  price: number
}

export interface IAddition {
  addition: IAdditionParams
  additionSum: number
  area: string | null
  depth: string | null
  length: string | null
  piece: string | null
}

export interface IAdditionParams {
  id: string
  name: string
  price: number | null
  status: boolean
  type: IAddType
}

export interface IDoor {
  id: string
  name: string
  price: number | null
  status: boolean
}

export interface IAddType {
  name: string,
  type: string
}

export interface INotify {
  type?: string,
  message?: string
}

export interface IErrors {
code: number,
value: string,
}

export interface IErrorDescr {
  detail: string
message: string
path: string
status: number
title: string
type: string
}

export interface IUser {
  username: string;
  password: string;
}


export interface IUserData extends IUser{
  idToken: string | null;
  expiresIn: number
}

export interface IStoreAuth {
  token: string | null
}
