<template>
  <div>
    <div class="container content">
      <div class="row">
        <div class="col-md-12">
          <header>
            <h2 class="title">1. Kampagne navn</h2>
          </header>

          <div class="form-group">
            <input
              v-on:keyup="campaignSetName($event.target.value)"
              v-model="campaignName"
              ref="field_campaign_name"
              type="text"
              class="form-control"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="container content">
      <div class="row">
        <div class="col-md-12">
          <h2 class="title">2. Opsæt en salgskanal</h2>

          <div class="row">
            <div class="col-md-5 card">
              <button v-on:click="chooseMedia('LocalMedia')" class="card-button">
                <h3 class="text-center">Top 30 & lokale medier</h3>

                <div class="fa-stack center-block">
                  <i class="fa fa-bookmark fa-3x" aria-hidden="true"></i>
                  <i class="fa fa-star fa-1x" aria-hidden="true"></i>
                </div>

                <p class="text-center">
                  Vælg dit budget, din periode og ret din annoncetekst i de næste steps
                </p>

                <i title="help for local media" class="fa fa-question-circle-o fa-absolute" aria-hidden="true"></i>
              </button>
            </div>


            <div class="col-md-5 col-md-offset-2 card">
              <button v-on:click="chooseMedia('SocialMedia')" class="card-button">
                <h3 class="text-center">Sociale medier</h3>

                <div class="row">
                  <div class="col-md-1 col-md-offset-4">
                    <div class="fa-stack center-block">
                      <i class="fa fa-facebook-square fa-3x" aria-hidden="true"></i>
                    </div>
                  </div>

                  <div class="col-md-1 col-md-offset-1">
                    <div class="fa-stack center-block">
                      <i class="fa fa-instagram fa-3x" aria-hidden="true"></i>
                    </div>
                  </div>
                </div>

                <p class="text-center">
                  Vælg dit budget, din periode og ret din annoncetekst i de næste steps
                </p>

                <i title="help for social media" class="fa fa-question-circle-o fa-absolute" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <simplert
      :useRadius=false
      :useIcon=true
      ref="simplert">
    </simplert>
  </div>
</template>

<script src="./Create.js"></script>

<style scoped lang="scss" src="./Create.scss"></style>
