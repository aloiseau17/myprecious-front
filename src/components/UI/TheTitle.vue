<template>
  <div class="the-title__wrapper">
    <h1 class="the-title">
      {{ title }}
    </h1>
  </div>
</template>

<script>
export default {
  name: 'TheTitle',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped lang="scss">
@import '~assets/scss/components/TheTitle.scss';
</style>
