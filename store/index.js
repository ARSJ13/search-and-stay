export const state = () => ({
  token: '',
  list: [],
  pagination: '',
  dataPattern: {
    bg_color: '',
    text_color: '',
    active: null
  }
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
  SET_LIST_CREATE (state, payload) {
    state.list.push(payload)
  },
  SET_PAGINATION (state, payload) {
    state.pagination = payload
  },
  SET_DATA_PATTERN (state, payload) {
    state.dataPattern = payload
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
        commit('SET_TOKEN', data.result.access_token)
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
        commit('SET_LIST', data.entities)
        commit('SET_PAGINATION', data.pagination)
        return data
      })
      .catch((err) => {
        localStorage.removeItem('av_token')
        return err
      })
  },
  async create ({ state, commit }, data) {
    const calendar_patterns = {
      bg_color: data.bg,
      text_color: data.text,
      active: data.active
    }
    return await this.$axios
      .$post(`/admin/calendar_patterns`, { calendar_patterns })
      .then(({ data }) => {
        commit('SET_LIST_CREATE', data)
        return data
      })
      .catch((err) => {
        localStorage.removeItem('av_token')
        return err
      })
  },
  async update ({ state, commit }, info) {
    const calendar_patterns = {
      bg_color: info.bg,
      text_color: info.text,
      active: info.active
    }
    return await this.$axios
      .$put(`/admin/calendar_patterns/${info.id}`, { calendar_patterns })
      .then(async ({ data }) => {
        const updateList = await state.list.map((el) => {
          if (data.id == el.id) {
            return data
          }
          return el
        });
        commit('SET_LIST', updateList)
      })
      .catch((err) => {
        localStorage.removeItem('av_token')
        return err
      })
  },
  async delete ({ dispatch }, id) {
    return await this.$axios
      .$delete(`/admin/calendar_patterns/${id}`)
      .then(async () => {
        await dispatch('listAll')
      })
      .catch((err) => {
        localStorage.removeItem('av_token')
        return err
      })
  }
}
