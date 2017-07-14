<script>
export default {
  name: 'accordion-item',

  props: {
    select: {
      default: function() {},
      type: Function
    },

    expanded: {
      default: false,
      type: Boolean
    }
  }
}
</script>

<template>
  <div
    class="accordion-item"
    :class="{ 'accordion-item--expanded': expanded }"
  >
    <button v-on:click="select" class="accordion-item-title">
      <slot name="title" />
    </button>

    <div
      class="accordion-item-content"
      :class="{ 'accordion-item-content--expanded': expanded }"
    >
      <slot name="content" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../../assets/styles/theme/variables.scss";

.accordion-item {
  &--expanded { }

  .accordion-item-content {
    display: none;

    &--expanded {
      display: block
    }
  }

  .accordion-item-title {
    height: auto;
    background: none;
    color: $white;
    outline: none;
    border: none;
  }
}
</style>