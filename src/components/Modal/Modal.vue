<template>
   <transition name="modal">
    <div :class="{shown: open}" class="modal-mask" v-on:click="handleCloseFromMask">
      <div class="modal-wrapper">
        <div class="modal-container content container-fluid">

          <div v-if="noHeader === undefined" class="modal-header">
            <slot name="header">
              default header
            </slot>

          </div>

          <div class="modal-body clearfix">
            <slot name="body" />
          </div>


          <div v-if="noFooter === undefined" class="modal-footer">
            <slot name="footer">
              default footer
              <button class="modal-default-button" @click="handleCloseModal">
                OK
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
/*
  Component shamefully copied from https://vuejs.org/v2/examples/modal.html,
  then adapted to suit adhub cnb needs.
*/
export default {
  name: 'modal',

  props: {
    clickOutsideToClose: false,
    noHeader: undefined,
    noFooter: undefined
  },

  data() {
    return {
      open: false,
    }
  },

  methods: {
    show() {
      this.open = true;
    },

    hide() {
      this.handleCloseModal();
    },

    handleCloseModal() {
      this.open = false;
      this.$emit('onClose');
    },

    handleCloseFromMask(evt) {
      const el = evt.target;
      if (el.getAttribute('class') === 'modal-wrapper' && this.clickOutsideToClose === true) {
        this.handleCloseModal();
      }
    }
  }
}
</script>

<style scoped lang="scss">
.modal-mask.shown {
  opacity: 1;
  display: table;

  .modal-container {
    transform: scale(1);
    transition: all .17s ease;
  }
}

.modal-mask {
  opacity: 0;
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  display: none;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  color: black;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
  transition: all .3s ease;
}

.modal-container {
  max-width: 90%;
  background-color: #fff;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  // margin: 20px 0 0 0;
  padding: 0;
}

.modal-default-button {
  float: right;
}

.modal-footer {
  border: none;
  padding: 0;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
  transform: scale(0);
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>