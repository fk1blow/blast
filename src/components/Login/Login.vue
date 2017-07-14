<template>
  <form>
    <div class="form-group">
      <slot name="title"></slot>
    </div>

    <div class="form-group">
      <input ref="email_field" autofocus class="form-control" type="email" placeholder="Email">
    </div>

    <div class="form-group">
      <input ref="password_field" class="form-control" type="password" placeholder="Password">
    </div>

    <div :class="{ 'form-group': true, hide: errors.description }">
      <button :disabled="false" v-on:click="submit" class="btn btn-primary form-control">
        Log ind
      </button>
    </div>

    <div :class="{ 'form-group': true, hide: !errors.description }">
      <button ref="reset_button" v-on:click="reset" class="btn btn-primary form-control">
        Retry?
      </button>
    </div>

    <div
      v-if="errors"
      :class="{hide: !errors.description}"
      class="form-group error-description">
      {{errors.description}}
    </div>

    <div class="form-group">
      <a class="forgot-pass" href="#">Forgot password?</a>
    </div>
  </form>
</template>

<script>
import Vue from 'vue';

export default Vue.component('login', {
  props: {
    errors: Object,
  },

  updated() {
    if (this.$refs.reset_button) this.$refs.reset_button.focus();
  },

  methods: {
    submit(evt) {
      evt.preventDefault();
      this.$emit('submit', {
        email: this.$refs.email_field.value,
        password: this.$refs.password_field.value
      });
    },

    reset(evt) {
      evt.preventDefault();
      this.$refs.email_field.focus();
      this.$emit('reset');
    }
  }
});
</script>

<style scoped lang="scss">
@import "../../assets/styles/theme/variables.scss";

.title {
  color: $black;
}

.form-group:last-child {
  margin: 0;
}

.error-description {
  color: $red;
}
</style>
