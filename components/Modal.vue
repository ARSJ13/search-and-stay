<template>
  <div>
    <b-modal
      id="modal-update"
      ref="modal"
      :title="dataPattern.id ? `Edit Color Pattern nº ${dataPattern.id}` : 'Create New Color Pattern'"
      @show="showModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Background Color"
          label-for="background"
          invalid-feedback="Background color is required"
          :state="bgState"
        >
          <b-form-input
            id="background"
            v-model="bg"
            :state="bgState"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Text Color"
          label-for="textColor"
          invalid-feedback="Text color is required"
          :state="textState"
        >
          <b-form-input
            id="textColor"
            v-model="text"
            :state="textState"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          v-if="!dataPattern.id"
          label="Active"
          label-for="active"
        >
          <b-form-checkbox
            id="active"
            v-model="active"
            switch
            checked
          >
          </b-form-checkbox>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
import { mapState } from 'vuex'
  export default {
    data() {
      return {
        bg: '',
        text: '',
        active: null,
        bgState: null,
        textState: null
      }
    },
    computed: {
      ...mapState({
        dataPattern: (state) => state.dataPattern
      }),
    },
    methods: {
      checkFormValidity() {
        const valid = this.$refs.form.checkValidity()
        this.bgState = valid
        this.textState = valid
        return valid
      },
      showModal() {
        this.bg = this.dataPattern.bg_color
        this.text = this.dataPattern.text_color
        this.active = this.dataPattern.active ? true : false
        this.bgState = null
        this.textState = null
      },
      resetModal() {
        this.bg = '',
        this.text = '',
        this.active = null,
        this.bgState = null
        this.textState = null
        this.$emit('close')
      },
      handleOk(bvModalEvent) {
        bvModalEvent.preventDefault()
        this.handleSubmit()
      },
      handleSubmit() {
        if (!this.checkFormValidity()) {
          return
        }
        
        this.$nextTick(() => {
          this.$bvModal.hide('modal-prevent-closing')
        })
      }
    }
  }
</script>