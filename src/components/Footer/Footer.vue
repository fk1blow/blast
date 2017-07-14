<template>
  <footer>
    <button v-on:click="goToNextPage" class="btn btn-primary form-control">
      <slot></slot>
      <i class="fa fa-angle-double-right" aria-hidden="true"></i>
    </button>
  </footer>
</template>

<script>
import Vue from 'vue';

export default Vue.component('app-footer', {
  name: 'app-footer',

  props: {
    nextPage: String,
    navigateWhen: {
      default: true,
      type: Boolean
    },
    replaceRoute: {
      default: false,
      type: Boolean
    }
  },

  methods: {
    goToNextPage() {
      const transition = (nextPage) =>
        this.replaceRoute ? this.$router.replace(nextPage) : this.$router.push(nextPage);

      this.$emit('before-next');
      this.$nextTick(() => {
        this.navigateWhen && this.nextPage && transition(this.nextPage);
      })
    }
  }
});
</script>
