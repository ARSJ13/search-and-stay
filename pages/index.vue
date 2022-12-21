<template>
  <div>
    <b-button @click="toggleBusy">
      Toggle Busy State
    </b-button>
    <b-table :items="list" :fields="fields" :busy="isBusy" class="mt-3" outlined>
      <template #table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle" />
          <strong>Loading...</strong>
        </div>
      </template>
      <template #cell(color)="data">
        <div class="p-2" :style="{
          background: data.value.bg,
          color: data.value.text
          }">{{ `Background: ${data.value.bg} - Text: ${data.value.text}` }}</div>
      </template>
      <template #cell(active)="data">
        <div>
          <b-form-checkbox v-model="data.item.active" switch size="lg"></b-form-checkbox>
        </div>
      </template>
    </b-table>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Home',
  data () {
    return {
      isBusy: false,
      fields: [
        'id',
        { key: 'color', label: 'Color Patterns' },
        { key: 'active', label: 'Active' }  
      ]
    }
  },
  computed: {
    ...mapState({
      list: (state) => state.list.map((item) => {
        return {
          id: item.id,
          color: { bg: item.bg_color, text: item.text_color },
          active: item.active ? true : false,
        }
      })
    })
  },
  created () {
    this.dataListAll()
  },
  methods: {
    toggleBusy () {
      this.isBusy = !this.isBusy
    },
    async dataListAll () {
      await this.$store.dispatch('listAll')
        .then(({ data }) => {
          return data
        })
        .catch(() => {
          this.loading = false
          this.showAlert = true
        })
    }
  }
}
</script>
