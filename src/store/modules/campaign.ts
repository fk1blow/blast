import R from 'ramda';
import Campaign from '@/lib/campaign';
import BudgetType from '@/lib/budget-type';

const initialState: Campaign = {
  type: undefined,
  name: undefined,
  startDate: undefined,
  zipCode: undefined,
  budget: undefined,
  location: undefined,
  banners: undefined,
  progress: {
    percentage: 0,
    steps: 0
  }
};

const CAMPAIGN_CHECK_PROGRESS = 'CAMPAIGN_CHECK_PROGRESS';
const CAMPAIGN_CREATE = 'CAMPAIGN_CREATE';
const CAMPAIGN_RESET = 'CAMPAIGN_RESET';
const CAMPAIGN_ADD_START_DATE = 'CAMPAIGN_ADD_START_DATE';
const CAMPAIGN_ADD_ZIPCODE = 'CAMPAIGN_ADD_ZIPCODE';
const CAMPAIGN_SELECT_BUDGET_TYPE = 'CAMPAIGN_SELECT_BUDGET_TYPE';
const CAMPAIGN_ADD_BANNERS = 'CAMPAIGN_ADD_BANNERS';
const CAMPAIGN_SET_NAME = 'CAMPAIGN_SET_NAME';

const getters = {
  campaignProgress: state => state.progress,
  campaignZipCode: state => state.zipCode,
  campaignStartDate: state => state.startDate,
  campaignBudget: state => state.budget,
  campaignType: state => state.type,
  campaignName: state => state.name
};

const actions = {
  campaignCreate({ commit, dispatch }, campaign: object) {
    commit(CAMPAIGN_CREATE, campaign);
  },

  campaignReset({ commit }) {
    commit(CAMPAIGN_RESET);
  },

  campaignAddStartDate({ commit }, date: object) {
    commit(CAMPAIGN_ADD_START_DATE, date);
  },

  campaignAddZipcode({ commit }, zipCode: object) {
    commit(CAMPAIGN_ADD_ZIPCODE, zipCode);
  },

  campaignSelectBudgetType({ commit }, { type, extra }) {
    commit(CAMPAIGN_SELECT_BUDGET_TYPE, { type, extra });
  },

  campaignCheckProgress({ commit }, forStep: number) {
    commit(CAMPAIGN_CHECK_PROGRESS, forStep);
  },

  campaignAddBanners({ commit }, banners: object) {
    commit(CAMPAIGN_ADD_BANNERS, banners);
  },

  campaignSetName({ commit }, name: string) {
    commit(CAMPAIGN_SET_NAME, name);
  }
};

const mutations = {
  [CAMPAIGN_CREATE]: function(state, { type }) {
    state.type = type;

    Object.keys(initialState)
      .filter(k => k !== 'name' && k !== 'type')
      .map(k => state[k] = initialState[k]);
  },

  [CAMPAIGN_RESET]: function(state) {
    Object.assign(state, initialState);
  },

  [CAMPAIGN_ADD_START_DATE]: function(state, date: object) {
    state.startDate = date;
  },

  [CAMPAIGN_ADD_ZIPCODE]: function(state, zipCode) {
    state.zipCode = zipCode;
  },

  [CAMPAIGN_SELECT_BUDGET_TYPE]: function(state, { type, extra }) {
    state.budget = {
      type: BudgetType[type],
      extra: extra
    }
  },

  [CAMPAIGN_CHECK_PROGRESS]: function(state, forStep: number) {
    switch(forStep) {
      case 1:
        state.progress = { percentage: 25, steps: 1 };
        break;

      case 2:
        state.progress = { percentage: 50, steps: 2 };
        break;

      case 3:
        state.progress = { percentage: 75, steps: 3 }
        break;

      case 4:
        state.progress = { percentage: 100, steps: 4 }
        break;

      default:
        state.progress = state.progress;
    }
  },

  [CAMPAIGN_ADD_BANNERS]: function(state, banners: object) {
    state.banners = banners;
  },

  [CAMPAIGN_SET_NAME]: function(state, name) {
    state.name = name;
  }
};

export default {
  getters,
  state: initialState,
  actions,
  mutations
}
