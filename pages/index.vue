<template>
  <div class="p-4">
    <b-overlay
      rounded="lg"
      class="overlay"
      :show="loading"
    >
      <b-button variant="primary" @click="createPattern">
        New Color Pattern
      </b-button>
      <b-table
        :items="list"
        :fields="fields"
        :busy="isBusy"
        class="mt-3"
        outlined
      >
        <template #table-busy>
          <div class="text-center text-danger my-2">
            <b-spinner class="align-middle" />
            <strong>Loading...</strong>
          </div>
        </template>
        <template #cell(bg)="data">
          <div class="p-2">
            <b-badge variant="light">
              {{ data.item.bg }}
            </b-badge>
          </div>
        </template>
        <template #cell(text)="data">
          <div class="p-2">
            <b-badge variant="light">
              {{ data.item.text }}
            </b-badge>
          </div>
        </template>
        <template #cell(active)="data">
          <div>
            <b-form-checkbox
              v-model="data.item.active"
              switch
              size="lg"
              disabled
            ></b-form-checkbox>
          </div>
        </template>
        <template #cell(actions)="data">
          <div>
            <b-button class="mr-2" variant="outline-light" @click="editPattern(data.value)">
              <b-icon variant="primary" icon="pencil-square"></b-icon>
            </b-button>
            <b-button variant="outline-light" @click="deletePattern(data.value)">
              <b-icon variant="danger" icon="trash"></b-icon>
            </b-button>
          </div>
        </template>
      </b-table>
      <b-row class="mt-5" align-h="center">
        <Pagination
          v-if="pagination.total > 10"
          :total="pagination.total"
          :perPage="pagination.per_page"
          @UpdatePage="changePage"
        />
      </b-row>
    </b-overlay>
    <Modal @close="closeModal" @update="isBusy = $event"></Modal>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Home',
  data () {
    return {
      loading: false,
      isBusy: false,
      fields: [
        'id',
        { key: 'bg', label: 'Background Color' },
        { key: 'text', label: 'Text Color' },
        { key: 'active', label: 'Active' }, 
        { key: 'actions', label: 'Actions' }  
      ]
    }
  },
  computed: {
    ...mapState({
      list: (state) => state.list.map((item) => {
        return {
          id: item.id,
          bg: item.bg_color,
          text: item.text_color,
          active: item.active ? true : false,
          actions: item
        }
      }),
      pagination: (state) => state.pagination
    })
  },
  created () {
    this.dataListAll()
  },
  methods: {
    changePage(ev) {
      console.log(ev)
    },
    async dataListAll () {
      this.loading = true
      await this.$store.dispatch('listAll')
        .then(({ data }) => {
          this.loading = false
          return data
        })
        .catch((err) => {
          this.loading = false
          console.log(err)
        })
    },
    createPattern() {
      this.showModal()
    },
    editPattern(info) {
      this.$store.commit('SET_DATA_PATTERN', info)
      this.showModal()
    },
    async deletePattern(info) {
      await this.$bvModal.msgBoxConfirm(`Please confirm that you want to delete is color pattern nº ${info.id}.`, {
        title: 'Please Confirm',
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'danger',
        okTitle: 'YES',
        cancelTitle: 'NO',
        footerClass: 'p-2',
        hideHeaderClose: false,
        centered: true
      })
        .then(value => {
          this.isBusy = true
          if (value) {
            this.$store.dispatch('delete', info.id)
            .then(() => this.isBusy = false)
          }
        })
        .catch(err => {
          console.log(err)
          this.isBusy = false
        })
    },
    showModal() {
      this.$bvModal.show('modal-update')
    },
    closeModal() {
      this.$store.commit('SET_DATA_PATTERN', {})
    }
  }
}
</script>
<style scoped>
.overlay {
  width: 100%;
  height: 100vh;
}
</style>
