
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
  contractId: number | null
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

export interface INewOrder {
  client: string,
  date: string,
  phone: string,
  total: null | number,
  getRangeDates: IRangeDate
  doors: ISelectDoor[],
}

export interface IRangeDate {
  from: string,
  to: string
}

export interface ISelectDoor {
  id: string | '',
  name: string | null,
  price: number | null,
  status: boolean,
  count: number | null,
  length: number | null,
  width: number | null,
  square: number | null,
  total: number | null,
  additionally: ISelectAddition[]
}

export interface IAdditionally {
  deep: number | null
  length: number | null
  area: string | null
  id: string
  name: string
  price: null |number
  square:number | null
  status: boolean
  total:number|null
  type:string | null
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
  id?: string
  name: string
  price: number | null
  status: boolean
  type: IAddType | null | string
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


export interface IUserData extends IUser {
  idToken: string | null;
  expiresIn: number
}

export interface IStoreAuth {
  token: string | null
}

export interface IDoors {
  allDoors: IDoor[],
  door: IDoor | unknown
}

export interface IStoreAdds {
  allAdds: Array<IAdditionParams>,
  addsType: IAddType[]
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

export interface ErrorData {
  entityName: string
  errorKey: string
  message: string
  params: string
  status: number
  title: string
  type: string
}

export interface IOrderStore {
  order: INewOrder,
  door: ISelectDoor,
  addition: ISelectAddition
}

export interface IStore {
  order: INewOrder,
  door: ISelectDoor
}

export interface IGetters {
  door: ISelectDoor
}

export interface ITrans {
  deep: number,
  getSquare: number,
  getTotal: number
}

export interface ISelectAddition {
  addition: IAdditionParams,
  deep: number | null,
  length: number | null,
  piece: number | null,
  square:number | null,
  total:number|null
}

export interface IChangeValue {
  value: number,
  id: string
}


