<template>
  <div class="container is-centered-tablet column">
    <article>
      <h2>Today</h2>

      <section>
        <ul>
          <li class="columns">
            <aside class="column is-3-desktop">
              <figure class="is-pulled-left image is-24x24">
                <img src="http://bulma.io/images/placeholders/24x24.png">
              </figure>

              <p>12:30:34 GMT+2</p>
            </aside>

            <p class="column is-3">
              <span>commit: </span>
              <a href="#">53299573223</a>
            </p>

            <p class="column is-narrow-desktop">
              <span>to: </span>
              <a href="#">heroku/miopic-hedgehog</a>
            </p>

            <div class="column has-text-right">
              <a href="#"><b>build logs</b></a>
              &nbsp;
              <a class="" href="#"><b>revert!</b></a>
            </div>
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
