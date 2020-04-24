<template>
  <FieldBase>
    <label v-if="label" :for="_uid">
      {{ label }}
    </label>
    <input
      :id="_uid"
      v-bind="$attrs"
      :value="value"
      @input="$emit('input', $event.target.value)"
    />
  </FieldBase>
</template>

<script>
import FieldBase from '~/components/UI/Form/FieldBase'

export default {
  name: 'TextField',
  components: {
    FieldBase,
  },
  props: {
    label: {
      type: String,
      required: false,
      default: null,
    },
    value: {
      type: [String, Number],
      required: false,
      default: null,
    },
  },
}
</script>
