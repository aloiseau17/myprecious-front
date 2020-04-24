<template>
  <FieldBase>
    <select
      v-bind="$attrs"
      :value="value"
      name="order"
      @input="$emit('input', $event.target.value)"
    >
      <option v-for="item in items" :key="item.value" :value="item.value">
        {{ item.label }}
      </option>
    </select>
  </FieldBase>
</template>

<script>
import FieldBase from '~/components/UI/Form/FieldBase'

export default {
  name: 'SelectField',
  components: {
    FieldBase,
  },
  props: {
    value: {
      type: String,
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
}
</script>
