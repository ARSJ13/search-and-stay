<template>
  <b-pagination
    v-model="currentPage"
    :total-rows="total"
    :per-page="perPage"
    first-number
    last-number
    @change="changePage"
  ></b-pagination>
</template>

<script>
export default {
  name: 'Pagination',
  data: () => {
    return {
      currentPage: 1  
    }
  },
  props: {
    total: {
      type: Number,
      require: true
    },
    perPage: {
      type: Number,
      require: true
    }
  }, 
  methods: {
    changePage(ev) {
      this.$emit('UpdatePage', ev)
    }
  }
}
</script>
