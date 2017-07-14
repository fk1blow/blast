<template>
  <div id="app">
    <app-header />

    <!-- <aside class="sidebar-menu is-pulled-left">
      <nav>
        <ul>
          <li><a href="#">Settings</a></li>
          <li><a href="#">Logs</a></li>
          <li><a href="#">Stats</a></li>
          <li><a href="#">Logout</a></li>
        </ul>
      </nav>
    </aside> -->

    <main class="columns is-tablet app-main-container">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import AppHeader from '@/components/Header/Header';

export default {
  name: 'app',

  components: {
    'app-header': AppHeader
  },

  created() {
    console.log('cnb app running')
  }
};
</script>

<style lang="scss">
  @import "../node_modules/font-awesome/css/font-awesome.css";
  @import "../node_modules/bulma/bulma.sass";
  @import "./assets/styles/theme.scss";

  #app {
    height: 100%;
  }

  .sidebar-menu {
    position: absolute;
    margin-top: 62px;
    padding: $dimension-default-padding;
    padding-top: 0;
    width: 217px;

    a {
      font-size: 16px;
      color: $dark-gray;

      &:hover {
        color: $scream-out-magenta;
      }
    }

    li {
      line-height: 32px;
    }
  }

  .app-main-container {
    margin-top: 50px;
  }
</style>
