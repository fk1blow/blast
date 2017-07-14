const initialState = {
  campaigns: [
    {
      id: 12345001,
      name: "first campaign",
      startDate: "2017-07-04T21:00:00.000Z",
      budget: { type: 1, extra: 0 },
      zipCode: 123,
      runningOn: 1
    },

    {
      id: 12345002,
      name: "company best",
      startDate: "2017-08-04T21:00:00.000Z",
      budget: { type: 0, extra: 0 },
      zipCode: 2034,
      runningOn: 1
    },

    {
      id: 12345003,
      name: "third world",
      startDate: "2017-09-04T21:00:00.000Z",
      budget: { type: 0, extra: 0 },
      zipCode: 2034,
      runningOn: 2
    },

    {
      id: 12345004,
      name: "fourth gadget",
      startDate: "2017-10-04T21:00:00.000Z",
      budget: { type: 1, extra: 0 },
      zipCode: 58573,
      runningOn: 2
    },

    {
      id: 12345005,
      name: "no campaign",
      startDate: "2017-11-04T21:00:00.000Z",
      budget: { type: 2, extra: 0 },
      zipCode: 58573,
      runningOn: 1
    },

    {
      id: 12345006,
      name: "regular",
      startDate: "2017-12-04T21:00:00.000Z",
      budget: { type: 2, extra: 0 },
      zipCode: 58573,
      runningOn: 2
    },

    {
      id: 12345007,
      name: "kmzu campaign",
      startDate: "2017-02-04T21:00:00.000Z",
      budget: { type: 1, extra: 0 },
      zipCode: 32874,
      runningOn: 2
    },

    {
      id: 12345008,
      name: "figaro campaign",
      startDate: "2017-03-04T21:00:00.000Z",
      budget: { type: 2, extra: 0 },
      zipCode: 32874,
      runningOn: 1
    },

    {
      id: 12345009,
      name: "astonishing campaign",
      startDate: "2017-04-04T21:00:00.000Z",
      budget: { type: 2, extra: 0 },
      zipCode: 2874,
      runningOn: 2
    }
  ],

  sorting: {
    current: null,
    0: { criteria: null, param: null },
    1: { criteria: null, param: null },
    2: { criteria: null, param: null },
    3: { criteria: null, param: null },
  }
};

const compareSort = (item1, item2) => {
  if (item1 < item2)
    return -1;
  if (item1 > item2)
    return 1;
  return 0;
}

enum SortCriteria {
  Name,
  Date,
  Budget,
  Performance
}

enum SortParam {
  Asc,
  Desc
}

interface SortType {
  criteria: SortCriteria,
  param: SortParam
}

const CAMPAIGN_SET_SORTING_PARAM = 'CAMPAIGN_SET_SORTING_PARAM';
const CAMPAIGN_SORT_BY_NAME = 'CAMPAIGN_SORT_BY_NAME';
const CAMPAIGN_SORT_BY_DATE = 'CAMPAIGN_SORT_BY_DATE';
const CAMPAIGN_SORT_BY_BUDGET = 'CAMPAIGN_SORT_BY_BUDGET';
const CAMPAIGN_SORT_BY_PERFORMANCE = 'CAMPAIGN_SORT_BY_PERFORMANCE';

const getters = {
  campaignsAll: state => state.campaigns,
  campaignSorting: state => state.sorting,
};

const actions = {
  sortCampaignBy({ commit }, sort: SortType) {
    switch(sort.criteria) {
      case SortCriteria.Name:
        commit(CAMPAIGN_SET_SORTING_PARAM,
          { param: sort.param, criteria: SortCriteria.Name });
        commit(CAMPAIGN_SORT_BY_NAME, sort.param);
        break;

       case SortCriteria.Date:
         commit(CAMPAIGN_SET_SORTING_PARAM,
            { param: sort.param, criteria: SortCriteria.Date });
         commit(CAMPAIGN_SORT_BY_DATE, sort.param);
         break;

       case SortCriteria.Budget:
         commit(CAMPAIGN_SET_SORTING_PARAM,
           { param: sort.param, criteria: SortCriteria.Budget });
         commit(CAMPAIGN_SORT_BY_BUDGET, sort.param);
         break;

       case SortCriteria.Performance:
         commit(CAMPAIGN_SORT_BY_PERFORMANCE);
         break;
    }
  }
};

const mutations = {
  [CAMPAIGN_SET_SORTING_PARAM]: function(state, { param, criteria }) {
    state.sorting.current = { criteria, param };
    state.sorting[criteria] = {
      ...state.sorting[criteria],
      param
    };
  },

  [CAMPAIGN_SORT_BY_NAME]: function(state, param) {
    state.campaigns = state.campaigns.sort((a, b) => {
      return param === 0 ? compareSort(a.name, b.name) : compareSort(b.name, a.name);
    });
  },

  [CAMPAIGN_SORT_BY_DATE]: function(state, param) {
    state.campaigns = state.campaigns.sort((a, b) => {
      let x = new Date(a.startDate).getTime();
      let y = new Date(b.startDate).getTime();
      return param === 0 ? compareSort(x, y) : compareSort(y, x);
    });
  },

  [CAMPAIGN_SORT_BY_BUDGET]: function(state, param) {
    state.campaigns = state.campaigns.sort((a, b) => {
      let x = a.budget.type + a.budget.extra;
      let y = b.budget.type + b.budget.extra;
      return param === 0 ? compareSort(x, y) : compareSort(y, x);
    });
  },

  [CAMPAIGN_SORT_BY_PERFORMANCE]: function(state) {
    // there is no spec defining the performance ATM
  },
};

export default {
  getters,
  state: initialState,
  actions,
  mutations
}