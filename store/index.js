export const state = () => ({
  token: '',
  list: [],
  pagination: ''
})

export const getters = {
  getToken (state) {
    return state.token
  },
  getList (state) {
    return state.list
  }
}

export const mutations = {
  SET_TOKEN (state, payload) {
    state.token = payload
  },
  SET_LIST (state, payload) {
    state.list = payload
  },
  SET_PAGINATION (state, payload) {
    state.pagination = payload
  }
}

export const actions = {
  async login ({ commit }, { email, password }) {
    return await this.$axios
      .$post('/admin/login_json', {
        login: {
          email,
          password
        }
      })
      .then(({ data }) => {
        commit('SET_USER', data.result.access_token)
        localStorage.setItem('av_token', `${data.result.access_token}`)
        this.$router.push({ path: '/' })
        return data
      })
      .catch((err) => {
        localStorage.removeItem('av_token')
        return err
      })
  },
  async listAll ({ commit }) {
    return await this.$axios
      .$get('/admin/calendar_patterns')
      .then(({ data }) => {
        commit('SET_LIST', data)
        return data
      })
      .catch((err) => {
        return err
      })
  }
}
