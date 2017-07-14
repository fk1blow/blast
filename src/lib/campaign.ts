import CampaignType from './campaign-type';
import Budget from './budget';

interface Campaign {
  type: CampaignType,
  name: string,
  startDate: object,
  zipCode: object,
  budget: Budget,
  location: string,
  banners: object,
  progress: {
    percentage: number,
    steps: number
  }
}

export default Campaign;
