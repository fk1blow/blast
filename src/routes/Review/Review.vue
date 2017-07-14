<template>
  <div class="container content">
    <div class="row">
      <breadcrumbs go-to="Banner-Preview" class="col-md-12" />
    </div>

    <main>
      <div class="row">
        <div class="col-md-5">
          <section class="review-section-item">
            <header><h2>General</h2></header>

            <div class="form-group ">
              <label>campaign name</label>
              <p>{{campaignName}}</p>

              <label>campaign type</label>
              <p>{{campaignTypeName}}</p>
            </div>

            <header><h2>Budget</h2></header>

            <div class="form-group">
              <label>budget type</label>
              <p>{{budgetTypeName}}</p>

              <label>extra budget</label>
              <p>{{campaignBudget.extra}}</p>
            </div>

            <header><h2>Period</h2></header>

            <div class="form-group">
              <label>start date</label>
              <p>{{campaignStartDate}}</p>
            </div>
          </section>
        </div>

        <div class="col-md-6 col-lg-offset-1">
          <section>
            <carousel-placeholder :loaded="previewFrameLoaded" class="preload text-center">
              <div
                v-html="previewFrame"
                ref="previewBanner"
              />
            </carousel-placeholder>
          </section>
        </div>
      </div>
    </main>

    <div class="row">
      <div class="col-md-5">
        <app-footer next-page="/dashboard">
          ok!
        </app-footer>
      </div>
    </div>
  </div>
</template>

<script src="./Review.js"></script>

<style scoped lang="scss" src="./Review.scss"></style>
