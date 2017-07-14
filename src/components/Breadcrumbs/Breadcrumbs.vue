<template>
  <div class="breadcrumbs">
    <a v-on:click="handleBackButton" href="#">
    <i class="fa fa-chevron-left" aria-hidden="true"></i>
      Tilbage
    </a>
  </div>
</template>

<script lang="ts">
import Maybe from 'folktale/maybe';

export default {
  name: 'breadcrumbs',

  props: {
    goTo: String
  },

  methods: {
    handleBackButton(evt) {
      evt.preventDefault();
      this.$router.back();
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/styles/theme/variables.scss";

.breadcrumbs {
  font-size: $font-size-larger;
  color: $blue-windows;

  .fa-chevron-left {
    color: $blue-windows;
    margin-right: $dimension-micro;
  }

  a:hover {
    color: $blue-windows;
    text-decoration: none;
  }
}
</style>
