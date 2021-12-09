import { Commit } from 'vuex';
import { api } from '../../boot/axios';
import { IUser, IUserData, IStoreAuth } from 'src/components/models';
import { AxiosError, AxiosResponse } from 'axios';

const state = (): IStoreAuth => ({
    token: localStorage.getItem('token') || null,
})

// actions
const actions = {
    async login({ commit }: { commit: Commit }, user: IUser) {
        try {
            const { data }: { data: IUserData } = await api
                .post('/api/authenticate', user)
            commit('setToken', data.idToken)
        } catch (error) {
            const { response } = error as AxiosError;
            const {status} = response as AxiosResponse
            throw status
        }
    }
}

// mutations
const mutations = {
    setToken(state: IStoreAuth, token: string) {
        state.token = token
        localStorage.setItem('token', token)
    },

    logout(state: IStoreAuth) {
        state.token = null
        localStorage.removeItem('token')
    }
}

// getters
const getters = {
    isAuthenticated(state: IStoreAuth) {
        return !!state.token
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}