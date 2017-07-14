<template>
  <header class="is-clearfix">
    <div class="logo is-pulled-left">b<span>/</span><span>last</span></div>

    <aside class="user is-pulled-right">
      <figure class="image is-32x32">
        <img src="http://bulma.io/images/placeholders/32x32.png">
      </figure>
    </aside>

    <section class="container header-command has-text-centered"># header commands</section>
  </header>
</template>

<script lang="ts">
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'app-header'
};
</script>

<style scoped lang="scss">
@import "../../assets/styles/theme/variables.scss";

header {
  padding: $dimension-default-padding;
  background-color: #FFFFFF;
  border-bottom: 4px solid #53DE85;

  aside {}

  .logo {
    color: $dark-gray;
    font-size: 24px;

    & span:first-child {
      color: #BDBDBD;
    }

    & span:last-child {
      color: #AA0B95;
    }
  }

  .header-command {
    font-size: 18px;
    line-height: 36px;
  }
}

</style>
