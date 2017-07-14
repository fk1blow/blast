<template>
  <div class="radial-progress" :data-progress="progress.percentage">
    <div class="circle">
      <div class="mask full">
        <div class="fill"></div>
      </div>

      <div class="mask half">
        <div class="fill"></div>
        <div class="fill fix"></div>
      </div>
    </div>

    <div class="inset">
      <div class="percentage">
        <div class="numbers">{{ progress.percentage }} %</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'progress-circle',

  props: {
    progress: Object
  }
}
</script>

<style lang="less">
.size(@w, @h) {
  height: @h;
  width: @w;
}

.radial-progress {
  @circle-size: 50px;
  @circle-background: #1E5F6F;
  @circle-color: #00FFF9;
  @inset-size: 40px;
  @inset-color: #161616;
  @transition-length: 0.1s;
  @shadow: 6px 6px 10px rgba(0,0,0,0.2);
  @percentage-color: #fff;
  @percentage-font-size: 12px;
  @percentage-text-width: 50px;

  margin: 50px;
  width:  @circle-size;
  height: @circle-size;

  background-color: @circle-background;
  border-radius: 50%;
  .circle {
    .mask, .fill, .shadow {
      width:    @circle-size;
      height:   @circle-size;
      position: absolute;
      border-radius: 50%;
    }
    .shadow {
      box-shadow: @shadow inset;
    }
    .mask, .fill {
      -webkit-backface-visibility: hidden;
      transition: -webkit-transform @transition-length;
      transition: -ms-transform @transition-length;
      transition: transform @transition-length;
      border-radius: 50%;
    }
    .mask {
      clip: rect(0px, @circle-size, @circle-size, @circle-size/2);
      .fill {
        clip: rect(0px, @circle-size/2, @circle-size, 0px);
        background-color: @circle-color;
      }
    }
  }
  .inset {
    width:       @inset-size;
    height:      @inset-size;
    position:    absolute;
    margin-left: (@circle-size - @inset-size)/2;
    margin-top:  (@circle-size - @inset-size)/2;

    background-color: @inset-color;
    border-radius: 50%;
    box-shadow: @shadow;
    .percentage {
      height:   @percentage-font-size;
      width:    @percentage-text-width;
      overflow: hidden;

      position: absolute;
      top:      (@inset-size - @percentage-font-size + 4) / 2;
      left:     (@inset-size - @percentage-text-width) / 2;

      line-height: 1;
      .numbers {
        // margin-top: -@percentage-font-size;
        // transition: width @transition-length;
        span {
          // width:          @percentage-text-width;
          display:        inline-block;
          vertical-align: top;
          text-align:     center;
          font-weight:    800;
          font-size:      @percentage-font-size;
          color:          @percentage-color;
        }
      }
    }
  }

  @i: 0;
  @increment: 180deg / 100;
  .loop (@i) when (@i <= 100) {
    &[data-progress="@{i}"] {
      .circle {
        .mask.full, .fill {
          -webkit-transform: rotate(@increment * @i);
          -ms-transform: rotate(@increment * @i);
          transform: rotate(@increment * @i);
        }
        .fill.fix {
          -webkit-transform: rotate(@increment * @i * 2);
          -ms-transform: rotate(@increment * @i * 2);
          transform: rotate(@increment * @i * 2);
        }
      }
      .inset .percentage .numbers {
        // width: @i * @percentage-text-width + @percentage-text-width;
      }
    }
    .loop(@i + 1);
  }
  .loop(@i);
}
</style>
