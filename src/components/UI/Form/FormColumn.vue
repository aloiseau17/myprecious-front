<template>
  <div class="form__column__item" :class="{ form__column__fix: !autoWidth }">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'FormColumn',
  props: {
    autoWidth: {
      type: Boolean,
    },
  },
}
</script>
