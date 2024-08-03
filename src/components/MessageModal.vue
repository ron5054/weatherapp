<template>
  <dialog
    ref="messageModal"
    class="message-modal"
    :style="{ backgroundColor: message?.type === 'error' ? 'red' : 'green' }"
  >
    <h1>{{ message?.text }}</h1>
  </dialog>
</template>

<script>
export default {
  name: 'MessageModal',
  props: {
    message: {
      type: Object,
    },
  },
  mounted() {
    this.$refs.messageModal.showModal()
    setTimeout(() => {
      this.$refs.messageModal.close()
    }, 2500)
  },
}
</script>
