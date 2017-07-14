import Vue from 'vue';
import Hello from '@/routes/Hello/Hello.vue';
import Create from '@/routes/Create/Create.vue';
import CampaingSettings from '@/routes/CampaignSettings/CampaignSettings.vue';
import BannerPreview from '@/routes/BannerPreview/BannerPreview.vue';
import Review from '@/routes/Review/Review.vue';
import Dashboard from '@/routes/Dashboard/Dashboard.vue';

export default [
  {
    path: '/',
    name: 'Hello',
    component: Hello
  }
];
