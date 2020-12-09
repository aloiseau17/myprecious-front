<template>
  <nav class="menu-settings__wrapper">
    <button class="highlight main-menu__item__link">
      <PictoArrow class="picto" />
      <span>Menu</span>
    </button>

    <div class="menu-settings">
      <ul class="menu-settings__pages">
        <li
          v-for="(item, index) in items"
          :key="`settings-nav-${index}`"
          class="menu-settings__item"
        >
          <nuxt-link
            v-if="item.path"
            :to="item.path"
            class="menu-settings__label"
          >
            {{ item.label }}
          </nuxt-link>
          <button v-else class="btn" @click="logout">
            {{ item.label }}
          </button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import PictoArrow from '~/static/images/picto-arrow.svg?inline'

export default {
  name: 'SettingsMenu',
  components: {
    PictoArrow,
  },
  data() {
    return {
      opened: false,
      items: [
        {
          label: 'Settings',
          path: '/settings',
        },
        {
          label: 'My account',
          path: '/settings/account',
        },
        {
          label: 'Log out',
          action: this.logout,
        },
      ],
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch('navigation/resetPage')
      await this.$auth.logout()
    },
  },
}
</script>

<style scoped lang="scss">
@import '~assets/scss/components/SettingsMenu.scss';
</style>
