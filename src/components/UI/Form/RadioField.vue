<template>
  <FieldBase>
    <div
      v-for="(item, index) in items"
      :key="`${_uid}-${index}`"
      class="form__group__radio"
    >
      <input
        :id="`${_uid}-${index}`"
        v-bind="$attrs"
        :value="item.value"
        type="radio"
        @input="$emit('input', item.value)"
      />
      <label :for="`${_uid}-${index}`">
        {{ item.label }}
      </label>
    </div>
  </FieldBase>
</template>

<script>
import FieldBase from '~/components/UI/Form/FieldBase'

export default {
  name: 'RadioField',
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
}
</script>
