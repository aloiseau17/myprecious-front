<template>
  <form
    class="form"
    :class="{ form__column: column }"
    @submit.prevent="$emit('submit')"
  >
    <ul v-if="errors" class="form form__errors">
      <li v-for="(error, key) in errors" :key="key">{{ key }}: {{ error }}</li>
    </ul>

    <slot name="content" />

    <slot name="footer">
      <FormFooter v-bind="$attrs" @cancel="$emit('cancel')" />
    </slot>
  </form>
</template>

<script>
import FormFooter from '~/components/UI/Form/FormFooter'

export default {
  name: 'FormBase',
  components: {
    FormFooter,
  },
  props: {
    errors: {
      type: Array,
      default() {
        return []
      },
    },
    column: {
      type: Boolean,
    },
  },
}
</script>
