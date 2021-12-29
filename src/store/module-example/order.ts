import { Commit } from 'vuex';

// import { api } from '../../boot/axios';
import { IRangeDate, ISelectDoor, IOrderStore, IAdditionParams, IChangeValue } from 'src/components/models';
import { api } from 'src/boot/axios';

// import { AxiosError, AxiosResponse } from 'axios';



const state = (): IOrderStore => ({
    order: {
        client: '',
        date: '',
        phone: '',
        total: null,
        getRangeDates: {
            from: '',
            to: ''
        },
        doors: [],
    },
    door: {
        id: '',
        name: '',
        price: null,
        status: false,
        count: null,
        length: null,
        width: null,
        square: null,
        total: null,
        additionally: []
    },
    addition: {
        addition: {
            name: '',
            price: null,
            status: false,
            type: null
        },
        deep: null,
        length: null,
        piece: null,
        square: null,
        total: null
    }
})

// actions
const actions = {
    addAddition({commit}: {commit:Commit}) {
        commit('addAddition')
    },
    async addOrder({commit, state}: {commit:Commit, state: IOrderStore}) {
        await api.post('/api/v1/order', state.order)
        .then(
            void console.log(state.order),
            void commit('addOrder')
            )
        .catch(e => {
            console.log(e)
        })
        
    }
}

// mutations
const mutations = {
    setName(state: IOrderStore, name: string) {
        state.order.client = name
    },

    setPhone(state: IOrderStore, phone: string) {
        state.order.phone = phone
    },

    setDate(state: IOrderStore, date: string) {
        state.order.date = date
    },

    setRangeDate(state: IOrderStore, date: IRangeDate) {
        state.order.getRangeDates = date
    }, 

    setDoor(state: IOrderStore, door: ISelectDoor) {
        const {id, name, price, status} = door
        state.door.name = name
        state.door.id = id
        state.door.price = price
        state.door.status = status
    }, 

    setCount(state: IOrderStore, count: number) {
        state.door.count = count
    },

    setHeight(state: IOrderStore, height: number) {
        state.door.length = height
    },

    setWidth(state: IOrderStore, width: number) {
        state.door.width = width
    },

    setDoorSquare(state: IOrderStore, square: number) {
        state.door.square = square
    },

    setDoorTotal(state: IOrderStore, total: number) {
        state.door.total = total
    },

    setAdd(state: IOrderStore, add: IAdditionParams) {
        state.addition.addition = add
    },

    setDeep(state: IOrderStore, deep: number) {
        state.addition.deep = deep
    },

    setSquare(state: IOrderStore, square: number) {
        state.addition.square = square
    },

    setTotal(state: IOrderStore, total: number) {
        state.addition.total = total
    },

    addAddition(state: IOrderStore) {
        state.door.additionally.push(state.addition)
        state.addition = {
            addition: {
                name: '',
                price: null,
                status: false,
                type: null
            },
            deep: null,
            length: null,
            piece: null,
            square: null,
            total: null
        }
    },
    changeDeep(state: IOrderStore, changeValue: IChangeValue) {
        const index = state.door.additionally.findIndex(add => add.addition.id == changeValue.id)
        state.door.additionally[index].deep = changeValue.value
    },
    changeSquare(state: IOrderStore, changeValue: IChangeValue) {
        const index = state.door.additionally.findIndex(add => add.addition.id == changeValue.id)
        state.door.additionally[index].square = changeValue.value
    },
    changeTotal(state: IOrderStore, changeValue: IChangeValue) {
        const index = state.door.additionally.findIndex(add => add.addition.id == changeValue.id)
        state.door.additionally[index].total = changeValue.value
    },
    delAdd(state: IOrderStore, id: string) {
        const index = state.door.additionally.findIndex(add => add.addition.id === id)
        state.door.additionally.splice(index, 1)
    },
    setPiece(state: IOrderStore, piece: number) {
        state.addition.piece = piece
    },
    changePiece(state:IOrderStore, changeValue: IChangeValue) {
        const index = state.door.additionally.findIndex(add => add.addition.id == changeValue.id)
        state.door.additionally[index].piece = changeValue.value
    },
    setLength(state: IOrderStore, length: number) {
        state.addition.length = length
    },
    changeLength(state: IOrderStore, changeValue: IChangeValue) {
        const index = state.door.additionally.findIndex(add => add.addition.id == changeValue.id)
        state.door.additionally[index].length = changeValue.value
    },
    addDoor(state: IOrderStore) {
        state.order.doors.push(state.door)
        state.door = {
            id: '',
            name: '',
            price: null,
            status: false,
            count: null,
            length: null,
            width: null,
            square: null,
            total: null,
            additionally: []
        }
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    addOrder(state: IOrderStore) {
        state.order = {
            client: '',
            date: '',
            phone: '',
            total: null,
            getRangeDates: {
                from: '',
                to: ''
            },
            doors: [],
            }
    },
    setSummaryTotal(state: IOrderStore, total: number) {
        state.order.total = total
    }
}

// getters
const getters = {
    door(state: IOrderStore) {
        return state
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}