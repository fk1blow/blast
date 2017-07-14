<template>
  <div class="container column is-two-thirds">
    <article>
      <h2>Today</h2>

      <section>
        <ul>
          <li class="columns">
            <aside class="column is-3">
              <figure class="is-pulled-left image is-24x24">
                <img src="http://bulma.io/images/placeholders/24x24.png">
              </figure>

              <p>12:30 GMT</p>
            </aside>

            <p class="column is-3 is-narrow-desktop">
              <span>commit: </span>
              <a href="#">53299573223</a>
            </p>

            <p class="column is-4">
              <span>target: </span>
              <a href="#">heroku/miopic-hedgehog</a>
            </p>

            <p class="column is-2">
              <a href="#"><b>see logs</b></a>
            </p>
            <p class="column is-1">
              <a href="#"><b>revert!</b></a>
            </p>
          </li>
        </ul>
      </section>
    </article>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'hello',
};
</script>

<style scoped lang="scss">
@import "../../assets/styles/theme/variables.scss";

article {
  margin-bottom: 32px;

  &:last-child {
    margin-bottom: 0;
  }

  h2 {
    margin-bottom: 32px;
    margin-left: 20px;
    font-size: 24px;
    font-weight: 200;
  }

  section {
    background-color: #FFFFFF;
    padding: 20px;
    font-size: 14px;

    p {
      span:first-child {
        font-weight: 600;
      }

      a {
        color: $washed-out-pink;
      }
    }

    aside {
      align-items: center;

      figure {
        margin-right: 8px;
      }

      p {
        line-height: 28px;
      }
    }

    li {
      align-items: center;
    }
  }
}
</style>
