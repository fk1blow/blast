<script>
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';
import Accordion from '@/components/Accordion/Accordion';
import AccordionItem from '@/components/Accordion/AccordionItem';

const sorterFieldMeta = (criteriaType, currentSorting) => {
  const target = currentSorting[criteriaType];
  return {
    criteria: criteriaType,
    param: (target ? Number(!target.param) : 0)
  }
};

export default {
  name: 'dashboard',

  components: {
    Accordion,
    AccordionItem
  },

  data() {
    return {
      accordionExpanded: 0
    }
  },

  computed: {
    ...mapGetters('dashboard', ['campaignsAll', 'campaignSorting']),

    nameSorterMeta() {
      return sorterFieldMeta(0, this.campaignSorting);
    },

    dateSorterMeta() {
      return sorterFieldMeta(1, this.campaignSorting);
    },

    budgetSorterMeta() {
      return sorterFieldMeta(2, this.campaignSorting);
    },

    currentSorting() {
      return this.campaignSorting.current;
    }
  },

  methods: {
    ...mapActions([
      'changePageTitle'
    ]),

    ...mapActions('dashboard', [
      'sortCampaignBy'
    ]),

    handleAccordionItemSelect(item) {
      return () => {
        this.accordionExpanded = item;
      }
    },

    campaignRunningOn(runningOn) {
      if (runningOn === 1) {
        return "Local Media";
      }
      return "Social Media";
    },

    sortingStands(criteria, param) {
      if (param === undefined && this.currentSorting.criteria !== criteria) {
        return true;
      }
      if (param !== undefined && this.currentSorting === null) {
        return false;
      }
      return this.currentSorting.criteria === criteria
        && this.currentSorting.param === param;
    }
  },

  created() {
    this.changePageTitle('Dashboard');
  }
}
</script>

<template>
  <div class="container content">
    <div class="row">
      <div class="col-md-12">
        <button class="btn btn-primary pull-right">New Campaign</button>
      </div>
    </div>

    <main>
      <div class="row">
        <div class="col-md-12">

          <accordion>
            <accordion-item
              :select="handleAccordionItemSelect(0)"
              :expanded="accordionExpanded === 0"
              slot="item"
            >
              <h2 slot="title">Future Campaigns</h2>

              <div slot="content">
                <header class="accordion-content-header row">
                  <div class="col-md-9">
                    <div class="form-group">
                      <button
                        v-on:click="sortCampaignBy(nameSorterMeta)"
                        class="btn btn-default"
                      >
                        <i
                          v-if="sortingStands(0, 0)"
                          class="fa fa-sort-asc" aria-hidden="true" />

                        <i
                          v-if="sortingStands(0, 1)"
                          class="fa fa-sort-desc" aria-hidden="true" />

                        <i
                          v-if="sortingStands(0, undefined)"
                          class="fa fa-sort" aria-hidden="true" />
                        sort by name
                      </button>


                      <button
                        v-on:click="sortCampaignBy(dateSorterMeta)"
                        class="btn btn-default"
                      >
                         <i
                          v-if="sortingStands(1, 0)"
                          class="fa fa-sort-asc" aria-hidden="true" />

                        <i
                          v-if="sortingStands(1, 1)"
                          class="fa fa-sort-desc" aria-hidden="true" />

                        <i
                          v-if="sortingStands(1, undefined)"
                          class="fa fa-sort" aria-hidden="true" />
                        sort by date
                      </button>

                      <button
                        v-on:click="sortCampaignBy(budgetSorterMeta)"
                        class="btn btn-default"
                      >
                        <i
                          v-if="sortingStands(2, 0)"
                          class="fa fa-sort-asc" aria-hidden="true" />

                        <i
                          v-if="sortingStands(2, 1)"
                          class="fa fa-sort-desc" aria-hidden="true" />

                        <i
                          v-if="sortingStands(2, undefined)"
                          class="fa fa-sort" aria-hidden="true" />
                        sort by budget
                      </button>
                    </div>
                  </div>

                  <div class="col-md-3">
                    <div class="form-group">
                      <input type="text" name="search-campaigns" class="form-control" />
                    </div>
                  </div>
                </header>

                <section class="row">
                  <article v-for="campaign in campaignsAll" class="col-md-4 campaign-box">
                    <div>
                      <h4>{{campaign.name}}</h4>

                      <div class="row">
                        <p class="col-md-8">Start date: {{campaign.startDate}}</p>
                        <div class="col-md-4">campaign banners</div>
                      </div>

                       <div class="row">
                        <p class="col-md-12">Budget: {{campaign.budget.type}}</p>
                      </div>

                       <div class="row">
                        <p class="col-md-12">Zipcode: {{campaign.zipCode}}</p>
                      </div>

                       <div class="row">
                        <div class="col-md-12">
                          <div class="form-group clearfix">
                            <button class="btn pull-right">edit</button>
                            <button class="btn pull-right">start now</button>
                          </div>
                        </div>
                      </div>

                      <div class="row">
                        <p class="col-md-12">
                          campaign is running on: {{campaignRunningOn(campaign.runningOn)}}
                        </p>
                      </div>
                    </div>
                  </article>
                </section>
              </div>
            </accordion-item>







            <accordion-item
              :select="handleAccordionItemSelect(1)"
              :expanded="accordionExpanded === 1"
             slot="item"
            >
              <h2 slot="title">Active Campaigns</h2>
              <div slot="content">content for active campaigns</div>
            </accordion-item>

            <accordion-item
              slot="item"
              :select="handleAccordionItemSelect(2)"
              :expanded="accordionExpanded === 2"
            >
              <h2 slot="title">Finished Campaigns</h2>
              <div slot="content">content for finished campaigns</div>
            </accordion-item>
          </accordion>

        </div>
      </div>
    </main>
  </div>
</template>

<style scoped lang="scss">
@import "../../assets/styles/theme/variables.scss";

.accordion-content-header {
  padding-top: $dimension-default;

  .btn-default, .btn-default:active {
    background: none;
    color: $white;
    outline: none;
    box-shadow: none;

    .fa {
      margin-right: 10px;
    }
  }

  .btn-default:active {
    color: $pink;
  }
}

.accordion-item--expanded {
  h2 {
    color: $pink;
  }
}

.accordion-item {
  section {
    margin-top: $dimension-default;
  }

  .campaign-box {
    margin-bottom: 20px;

    &:nth-last-of-type(-n+3) {
      margin-bottom: 0;
    }

    & > div {
      background: $gray;
      padding: $dimension-micro;
    }

    .btn {
      color: $black;
      background-color: $white;

      &:last-child {
        margin-right: 10px;
      }
    }
  }
}
</style>