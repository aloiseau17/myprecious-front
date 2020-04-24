<template>
  <FieldBase>
    <label v-if="label" :for="_uid">
      {{ label }}
    </label>
    <Autocomplete
      :id="_uid"
      v-bind="$attrs"
      :value="value"
      :fetch-suggestions="fetchSuggestions"
      autosize
      autocomplete
      clearable
      size="max"
      class="inline-input"
      @select="select"
      @input="$emit('input', $event)"
    >
      <template slot-scope="{ item }">
        <slot :item="item" />
      </template>
    </Autocomplete>
  </FieldBase>
</template>

<script>
import { Autocomplete } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import FieldBase from '~/components/UI/Form/FieldBase'

export default {
  name: 'AutocompleteField',
  components: {
    Autocomplete,
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
    fetchSuggestions: {
      type: Function,
      required: true,
    },
    select: {
      type: Function,
      required: true,
    },
  },
}
</script>
