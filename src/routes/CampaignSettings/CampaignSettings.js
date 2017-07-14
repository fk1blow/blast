import { mapActions, mapGetters } from 'vuex';
import Datepicker from 'vuejs-datepicker';
import { BasicSelect } from 'vue-search-select';
import Simplert from 'vue2-simplert'
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import AppFooter from '@/components/Footer/Footer';
import BudgetType from '@/lib/budget-type';

export default {
  name: 'campaign-settings',

  components: {
    breadcrumbs: Breadcrumbs,
    datepicker: Datepicker,
    basicSelect: BasicSelect,
    simplert: Simplert,
  },

  data() {
    return {
      options: [
        { value: '9990', text: '9990 Skagen' },
        { value: '9981', text: '9981 Jerup' },
        { value: '9970', text: '9970 Strandby' }
      ],

      budgetExtra: {
        0: 0,
        1: 0,
        2: 0
      }
    };
  },

  computed: {
    ...mapGetters([
      'campaignZipCode',
      'campaignStartDate',
      'campaignBudget'
    ]),

    campaignType() {
      return this.campaignBudget && this.campaignBudget.type;
    },

    stepIsValid() {
      return this.campaignBudget !== undefined
        && this.campaignStartDate !== undefined
        && this.campaignZipCode !== undefined;
    }
  },

  created() {
    this.changePageTitle('Kampagne indstillinger');
    if (this.campaignBudget && this.campaignBudget.type !== undefined) {
      this.budgetExtra[this.campaignBudget.type] = this.campaignBudget.extra;
    }
  },

  methods: {
    ...mapActions([
      'changePageTitle',
      'campaignAddStartDate',
      'campaignAddZipcode',
      'campaignSelectBudgetType',
      'campaignCheckProgress'
    ]),

    selectBudgetType(type) {
      this.campaignSelectBudgetType({
        type: BudgetType[type],
        extra: Number(this.$refs["budgetType" + type].value)
      });
    },

    handleChangeExtra(value) {
      this.budgetExtra[this.campaignBudget.type] = value;

      this.campaignSelectBudgetType({
        type: BudgetType[this.campaignBudget.type],
        extra: Number(value)
      });
    },

    checkProgress() {
      if (this.stepIsValid) {
        this.campaignCheckProgress(2);
      }
      else {
        let obj = {
          message: 'Du har brug for et budget, startdato og postnummer for at fortsætte',
          type: 'info',
          customCloseBtnClass: 'btn btn-primary',
          customCloseBtnText: 'Luk',
        }
        this.$refs.simplert.openSimplert(obj);
      }
    }
  }
};