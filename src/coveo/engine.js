//dummy data
// import { buildSearchEngine, getSampleSearchEngineConfiguration } from "@coveo/headless";

// export const engine = buildSearchEngine({
//   configuration: getSampleSearchEngineConfiguration(),
// });


import { buildSearchEngine } from '@coveo/headless';

export const engine = buildSearchEngine({
  configuration: {
    organizationId: import.meta.env.VITE_COVEO_ORG_ID,
    accessToken: import.meta.env.VITE_COVEO_ACCESS_TOKEN,
    platformUrl: import.meta.env.VITE_COVEO_PLATFORM_URL,
    search: {
      searchHub: import.meta.env.VITE_COVEO_SEARCH_HUB,
      pipeline: import.meta.env.VITE_COVEO_PIPELINE,
    },
    analytics: { enabled: true },
  },
});
