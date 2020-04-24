<template>
  <nav class="menu-settings--mobile menu-settings">
    <ul class="menu-settings__pages">
      <li class="menu-burger__item">
        <img
          class="logo"
          src="~/static/images/logo.svg"
          alt="My Precious - movie library"
          width="243"
          height="50"
        />
      </li>
      <li
        v-for="(item, index) in items"
        :key="`settings-nav-${index}`"
        class="menu-settings__item"
        @click="opened = false"
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
  </nav>
</template>

<script>
export default {
  name: 'SettingsMenuMobile',

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
    logout() {
      this.$auth.logout()
    },
  },
}
</script>

<style scoped lang="scss">
@import '~assets/scss/components/SettingsMenuMobile.scss';
</style>
