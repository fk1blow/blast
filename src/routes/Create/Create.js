import { mapActions, mapGetters } from 'vuex';
import Simplert from 'vue2-simplert'
import CampaignType from '@/lib/campaign-type';

export default {
  components: {
    simplert: Simplert
  },

  computed: {
    ...mapGetters(['campaignName'])
  },

  methods: {
    ...mapActions([
      'changePageTitle',
      'campaignCreate',
      'campaignCheckProgress',
      'showProgress',
      'campaignSetName',
      'bannersResetAll',
      'previewResetFields'
    ]),

    handleOnChange(...args) {
      this.campaignSetName(this.$refs.field_campaign_name.value);
    },

    chooseMedia(type) {
      let campaignName = this.$refs.field_campaign_name.value;

      if (campaignName.trim().length) {
        this.bannersResetAll();
        this.campaignCreate({ type: CampaignType[type] });
        this.campaignCheckProgress(1);
        this.previewResetFields();
        this.$router.push('/campaign-settings');
      } else {
        let obj = {
          message: 'Du skal vælge kampagnens navn',
          type: 'info',
          customCloseBtnClass: 'btn btn-primary',
          customCloseBtnText: 'Luk',
          onClose: () => this.$refs.field_campaign_name.focus()
        }
        this.$refs.simplert.openSimplert(obj);
      }
    }
  },

  created() {
    this.changePageTitle('Opret emnekampagne');
    this.showProgress();
  },

  mounted() {
    this.$refs.field_campaign_name.focus();
  }
};