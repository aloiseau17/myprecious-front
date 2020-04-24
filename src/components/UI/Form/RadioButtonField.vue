<template>
  <FieldBase class="btn-select__wrapper">
    <button
      v-for="(item, index) in items"
      :key="`button-${_uid}-${index}`"
      :class="{ active: value === item.value }"
      class="btn-select"
      type="button"
      @click="possessionSelect(item.value)"
    >
      {{ item.label }}
    </button>

    <input
      v-for="(item, index) in items"
      :id="`${_uid}-${index}`"
      :key="`input-${_uid}-${index}`"
      v-bind="$attrs"
      :value="item.value"
      class="btn-select__input"
      type="radio"
    />
  </FieldBase>
</template>

<script>
import FieldBase from '~/components/UI/Form/FieldBase'

export default {
  name: 'RadioButtonField',
  components: {
    FieldBase,
  },
  props: {
    value: {
      type: [String, Number, Boolean],
      required: false,
      default: null,
    },
    items: {
      type: Array,
      required: true,
      default() {
        return []
      },
    },
  },
  methods: {
    possessionSelect(newValue) {
      this.value === newValue
        ? this.$emit('reset')
        : this.$emit('input', newValue)
    },
  },
}
</script>
