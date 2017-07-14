<template>
  <div>
    <div class="row banner-list">

      <div v-for="item in images" class="banner-item col-lg-3 col-md-4">
        <div
          v-on:click="handleToggleItemCheck(item)"
          class=""
          :class="{ 'item-unchecked': item.checked === false }"
        >
          <div class="item-checkbox">
            <i :class="{ hide: !item.checked }" class="fa fa-check" aria-hidden="true"></i>
            <i :class="{ hide: item.checked }" class="fa fa-times" aria-hidden="true"></i>
          </div>

          <div class="banner-img text-center">
            <img v-bind:src="item.path" />
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'image-grid',

  props: {
    images: Array
  },

  methods: {
    handleToggleItemCheck(item) {
      this.$emit('toggle', item);
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/styles/theme/variables.scss";

.banner-list {
  .banner-item {
    margin-bottom: 30px;

    & > div {
      position: relative;
      border: 4px solid $cyan;
      background: $gray;
    }

    & > div:hover {
      cursor: pointer;
    }

    .banner-img {
      height: 14rem;
      display: block;
      overflow: hidden;

      img {
        object-fit: cover;
        width: 100%;
        height: 100%;
      }
    }

    & > div.item-unchecked {
      border: 4px solid $red;

      .item-checkbox {
        border-top-color: $red;
        border-right-color: transparent;
      }
    }

    .item-checkbox {
      position: absolute;
      top: 0;
      left: 0;
      width: 0;
      height: 0;
      border-top: 60px solid $cyan;
      border-right: 60px solid transparent;

      .fa {
        position: absolute;
        font-size: $font-size-x-large;
        top: -54px;
        left: 4px;
        color: $white;
      }
    }
  }

  .btn {
    display: none;
    width: 100%;
    margin-top: 10px;
    margin-bottom: 30px;
  }
}
</style>