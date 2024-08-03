<template>
  <dialog
    v-if="message"
    ref="messageModal"
    class="message-modal"
    :style="{ backgroundColor: message?.type === 'error' ? 'brown' : 'green' }"
  >
    <p>{{ message?.text }}</p>
  </dialog>
</template>

<script>
export default {
  name: 'MessageModal',
  computed: {
    message() {
      return this.$store.getters.message
    },
  },
  methods: {
    showMessage() {
      this.$refs.messageModal?.showModal()
      setTimeout(() => {
        this.$refs.messageModal?.close()
      }, 2500)
    },
  },
  mounted() {
    this.showMessage()
  },
  watch: {
    message() {
      this.showMessage()
    },
  },
}
</script>

<style scoped>
.message-modal {
  border-radius: 0.5rem;
  border: none;
  outline: none;
  box-shadow: 0 0 0.5rem 0.5rem rgba(0, 0, 0, 0.3);
}

p {
  color: aliceblue;
}
</style>
