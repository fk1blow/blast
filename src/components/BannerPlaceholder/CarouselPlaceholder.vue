<template>
  <div class="placeholder carousel-placeholder">
    <div :class="{ invisible: !loaded }">
      <slot></slot>
    </div>

    <div v-if="!loaded">
      <header class="placeholder-header row">
        <div class="col-md-12">
          <span class="title-avatar"></span>
          <div class="title-text-holder">
            <span class="title-text title-text--a"></span>
            <span class="title-text title-text--b"></span>
          </div>
        </div>
      </header>


      <article class="placeholder-article row">
        <div class="col-md-7 col-xs-7"><span></span></div>
        <div class="col-md-5 col-xs-5"><span></span></div>
      </article>

      <footer class="placeholder-footer row">
        <div class="col-md-7"><span></span></div>
        <div class="col-md-5"><span></span></div>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'carousel-placeholder',

  props: {
    loaded: false
  }
}
</script>

<style scoped lang="scss">
.placeholder {
  .invisible {
    width: 0;
    height: 0;
    overflow: hidden;
  }

  &.carousel-placeholder {
    display: block;
    padding: 20px;
    height: 558px;
    background: #808080;

    .placeholder-header {
      .title-avatar {
        float: left;
        margin-right: 20px;
        width: 70px;
        height: 70px;
        background: #C4C4C4;
      }

      .title-text-holder {
        float: left;
        padding-top: 18px;
      }

      .title-text {
        float: left;
        background: #C4C4C4;

        &--a {
          margin-bottom: 8px;
          width: 190px;
          height: 14px;
        }

        &--b {
          width: 190px;
          height: 10px;
          clear: left;
        }
      }
    }

    .placeholder-article {
      margin-top: 20px;

      & > div span {
        display: block;
        height: 396px;
        background: #C4C4C4;
      }
    }

    .placeholder-footer {
      margin-top: 20px;

      & > div span {
        display: block;
        height: 10px;
        background: #C4C4C4;
      }
    }
  }
}
</style>