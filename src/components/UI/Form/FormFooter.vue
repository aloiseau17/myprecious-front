<template>
  <div class="form__footer">
    <button
      :disable="loading"
      :class="{ loading: loading }"
      class="btn"
      type="submit"
    >
      {{ saveLabel }}
      <div v-if="loading" class="lds-dual-ring" />
    </button>
    <a v-if="!noCancel" class="form__cancel" @click.prevent="$emit('cancel')">
      {{ cancelLabel }}
    </a>
  </div>
</template>

<script>
export default {
  name: 'FormFooter',
  props: {
    loading: {
      type: Boolean,
    },
    noCancel: {
      type: Boolean,
    },
    saveLabel: {
      type: String,
      default: 'Save',
    },
    cancelLabel: {
      type: String,
      default: 'cancel',
    },
  },
}
</script>
