<template>
  <div class="app form-page">
    <MainMenu />
    <div class="content">
      <nuxt />
    </div>
  </div>
</template>

<script>
import MainMenu from '~/components/Navigation/MainMenu'

export default {
  components: { MainMenu },
}
</script>

<style lang="scss">
.form-page {
  display: flex;
  flex-direction: column;
  align-items: strech;
  justify-content: strech;
  height: 100vh;
  min-height: 100vh;

  .app {
    position: relative;
    z-index: 0;
  }

  .main-menu {
    @include mq('laptop', 'bottom') {
      display: none;
    }

    .menu-burger__pages {
      background-color: #fff;
    }
  }

  .content {
    display: flex;
    flex: 1 1 auto;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    padding: 20px 30px;
    background-color: $third-color;

    &__title {
      margin: 0 0 20px;
      text-align: center;

      @include mq('laptop') {
        margin-bottom: 120px;
      }

      &-wrapper {
        text-align: center;
      }
    }

    &__inner {
      width: 80%;
      max-width: 400px;
      margin: 0 auto;
    }
  }
}
</style>
