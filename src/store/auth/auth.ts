import { Commit } from 'vuex';
import { api } from '../../boot/axios';
import { IUser, IUserData, IStoreAuth } from 'src/components/models';
import { AxiosError } from 'axios';

const state = (): IStoreAuth => ({
    token: localStorage.getItem('token') || null,
})

// actions
const actions = {
    async login({ commit }: { commit: Commit }, user: IUser): Promise<void> {
        try {
            const { data }: { data: IUserData } = await api
                .post('/api/authenticate', user)
            commit('setToken', data.idToken)
        } catch (error) {
            const { code } = error as AxiosError;
            if (code) {
                throw new Error(code)
            }
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

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}