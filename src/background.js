'use strict';

import supabase from './supabase-client';

// With background scripts you can communicate with popup
// and contentScript files.
// For more information on background script,
// See https://developer.chrome.com/extensions/background_pages

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  (async () => {
    if (request.type === 'SEND_JOBS_LINKS') {
      const jobsLinks = request.payload.message;

      if (Array.isArray(jobsLinks) && jobsLinks.length > 0) {
        let data;

        try {
          data = await Promise.all(
            await jobsLinks.map(async (link) => {
              const { data: job, error } = await supabase
                .from('jobs')
                .select('*')
                .eq('link', link);

              return job;
            })
          );

          sendResponse({
            message: { data, error: null },
          });
        } catch (error) {
          sendResponse({
            message: { data: null, error },
          });
        }
      }
    }
  })();

  return true;
});
