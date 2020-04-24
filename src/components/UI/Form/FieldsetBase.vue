<template>
  <fieldset>
    <legend v-if="legend">{{ legend }}</legend>
    <slot />
  </fieldset>
</template>

<script>
export default {
  name: 'FieldsetBase',
  props: {
    legend: {
      type: String,
      default: null,
    },
  },
}
</script>
