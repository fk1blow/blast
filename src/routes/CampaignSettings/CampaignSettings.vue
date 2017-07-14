<template>
  <div class="container content">
    <div class="row">
      <breadcrumbs class="col-md-12" />
    </div>

    <main class="row">
      <div class="col-md-5">
        <section>
          <header><h2>1. Startdato</h2></header>
          <div class="form-group">
            <datepicker
              :value="campaignStartDate"
              :calendarButton="true"
              class="mxv"
              v-on:selected="campaignAddStartDate"
              placeholder="Vælg startdato"
              input-class="form-control--calendar"
              calendar-button-icon="fa fa-calendar"
            />
          </div>
        </section>

        <section>
          <header><h2>2. Placering</h2></header>
          <div class="form-group">
            <basic-select :options="options"
                :selected-option="campaignZipCode"
                placeholder="Vælg postnumre"
                @select="campaignAddZipcode">
            </basic-select>
          </div>
        </section>
      </div>

      <div class="col-md-6 col-md-offset-1">
        <section>
          <header><h2>3. Periode og budget</h2></header>
          <div class="row">
            <div class="col-md-4 form-group">
              <button
                v-on:click="selectBudgetType(0)"
                class="btn btn-secondary form-control wrap-line"
                :class="{ selected: campaignType == 0 }"
              >
                7 dage - DKK 500,-
              </button>
            </div>

            <div class="col-md-4 form-group">
              <button
                v-on:click="selectBudgetType(1)"
                class="btn btn-secondary form-control wrap-line"
                :class="{ selected: campaignType == 1 }"
              >
                14 dage - DKK 1.000,-
              </button>
            </div>

            <div class="col-md-4 form-group">
              <button
                v-on:click="selectBudgetType(2)"
                class="btn btn-secondary form-control wrap-line"
                :class="{ selected: campaignType == 2 }"
              >
                28 dage - DKK 1.500,-
              </button>
            </div>
          </div>


          <div class="row">
            <div class="col-md-4 form-group">
              <label for="extra-buget-field-1">+ Tilføj ekstra budget</label>
              <input
                :disabled="campaignType != undefined && campaignType != 0"
                v-on:keyup="handleChangeExtra($event.target.value)"
                v-model="budgetExtra[0]"
                ref="budgetType0"
                id="extra-buget-field-1"
                type="number"
                class="form-control" />
            </div>

            <div class="col-md-4 form-group">
              <label for="extra-buget-field-2">+ Tilføj ekstra budget</label>
              <input
                :disabled="campaignType && campaignType != 1"
                v-on:keyup="handleChangeExtra($event.target.value)"
                v-model="budgetExtra[1]"
                ref="budgetType1"
                id="extra-buget-field-2"
                type="number"
                class="form-control" />
            </div>

            <div class="col-md-4 form-group">
              <label for="extra-buget-field-3">+ Tilføj ekstra budget</label>
              <input
                :disabled="campaignType && campaignType != 2"
                v-on:keyup="handleChangeExtra($event.target.value)"
                v-model="budgetExtra[2]"
                ref="budgetType2"
                id="extra-buget-field-3"
                type="number"
                class="form-control" />
            </div>
          </div>
        </section>
      </div>
    </main>

    <div class="row">
      <div class="col-md-12">
        <app-footer
          next-page="/banner-preview"
          v-on:before-next="checkProgress"
          v-bind:navigate-when="stepIsValid"
        >
          Gem og videre til banner
        </app-footer>
      </div>
    </div>

     <simplert
      :useRadius=false
      :useIcon=true
      ref="simplert">
    </simplert>
  </div>
</template>

<script src="./CampaignSettings.js"></script>

<style scoped lang="scss" src="./CampaignSettings.scss"></style>
