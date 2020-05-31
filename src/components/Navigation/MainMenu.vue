<template>
  <nav class="main-menu" :class="$nuxt.$route.name">
    <template v-if="['small', 'tablet'].includes($mq)">
      <BurgerButton
        :class="{ 'is-active': opened }"
        @click.native="toggleMenu"
      />
      <SettingsMenuMobile :class="{ closed: !opened }" />
    </template>

    <template v-if="['laptop', 'desktop'].includes($mq)">
      <nuxt-link class="logo__wrapper" to="/movies">
        <img
          class="logo"
          src="~/static/images/logo.svg"
          alt="My Precious - movie library"
          width="226"
          height="40"
        />
      </nuxt-link>
    </template>

    <ul class="main-menu__pages">
      <li
        v-for="(item, index) in items"
        :key="`item-${index}`"
        class="main-menu__item"
        :class="item.classes"
      >
        <nuxt-link :to="item.path" class="main-menu__item__link">
          <component :is="item.icon" :class="`picto ${item.name}`" />
          <span class="main-menu__item__label">{{ item.label }}</span>
        </nuxt-link>
      </li>
    </ul>

    <template v-if="['laptop', 'desktop'].includes($mq)">
      <SettingsMenu />
    </template>
  </nav>
</template>

<script>
const SettingsMenu = () =>
  import(
    /* webpackChunkName: "SettingsMenu" */ '~/components/Navigation/SettingsMenu'
  )
const SettingsMenuMobile = () =>
  import(
    /* webpackChunkName: "SettingsMenuMobile" */ '~/components/Navigation/SettingsMenuMobile'
  )

import BurgerButton from '~/components/Navigation/BurgerButton'

import PictoNavBuy from '~/static/images/picto-nav-buy.svg?inline'
import PictoNavOwn from '~/static/images/picto-nav-own.svg?inline'
import PictoNavSee from '~/static/images/picto-nav-see.svg?inline'
import PictoNavSeen from '~/static/images/picto-nav-seen.svg?inline'
import PictoNavAdd from '~/static/images/picto-nav-add.svg?inline'

export default {
  name: 'MainMenu',
  components: {
    BurgerButton,
    SettingsMenu,
    SettingsMenuMobile,
    PictoNavBuy,
    PictoNavOwn,
    PictoNavSee,
    PictoNavSeen,
    PictoNavAdd,
  },
  data() {
    return {
      opened: false,
      items: [
        {
          path: '/movies/to-buy',
          icon: PictoNavBuy,
          name: 'buy',
          label: 'To buy',
        },
        {
          path: '/movies/own',
          icon: PictoNavOwn,
          name: 'own',
          label: 'Own',
        },
        {
          path: '/movies/to-see',
          icon: PictoNavSee,
          name: 'see',
          label: 'To see',
        },
        {
          path: '/movies',
          icon: PictoNavSeen,
          name: 'seen',
          label: 'Seen',
        },
        {
          path: '/movies/add',
          icon: PictoNavAdd,
          name: 'add',
          label: 'Add movie',
          classes: 'add-button highlight',
        },
      ],
    }
  },
  head() {
    return {
      htmlAttrs: {
        class: this.opened ? ['menu-opened'] : [],
      },
    }
  },
  methods: {
    toggleMenu() {
      if (window.innerWidth < 992) this.opened = !this.opened
    },
  },
}
</script>

<style lang="scss">
@import '~assets/scss/components/MainMenu.scss';
</style>
