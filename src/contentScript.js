'use strict';

// Content script file will run in the context of web page.
// With content script you can manipulate the web pages using
// Document Object Model (DOM).
// You can also pass information to the parent extension.

// We execute this script by making an entry in manifest.json file
// under `content_scripts` property

// For more information on Content Scripts,
// See https://developer.chrome.com/extensions/content_scripts

const jobsElements = document.querySelectorAll('.job-list-item__link');

const jobsLinks = [];

for (let i = 0; i < jobsElements.length; i++) {
  jobsLinks.push(jobsElements[i].href);
}

// Communicate with background file by sending a message
chrome.runtime.sendMessage(
  {
    type: 'SEND_JOBS_LINKS',
    payload: {
      message: jobsLinks,
    },
  },
  (response) => {
    if (response?.message) {
      const { data: jobs, error } = response.message;

      if (error) {
        console.log('Something went wrong with getting jobs!');
        return;
      }

      for (let i = 0; i < jobsElements.length; i++) {
        const jobItem = jobs[i];

        const aElem = document.createElement('a');

        aElem.style.backgroundColor = '#383d42';
        aElem.style.fontWeight = 'bold';
        aElem.style.padding = '6px';
        aElem.style.borderRadius = '6px';

        aElem.innerText =
          jobItem.length > 0 ? 'Checkout reviews!' : 'No reviews. Be first!';

        aElem.target = '_blank';

        const id = jobItem[0]?.id ? jobItem[0].id : null;

        if (id !== null) {
          aElem.href = `http://localhost:3000/job/${encodeURIComponent(
            jobsElements[i].href
          )}/${encodeURIComponent(jobsElements[i].innerText)}/${id}`;
        }

        if (id === null) {
          aElem.href = `http://localhost:3000/job/${encodeURIComponent(
            jobsElements[i].href
          )}/${encodeURIComponent(jobsElements[i].innerText)}`;
        }

        const jobElementParent = jobsElements[i].parentNode;
        jobElementParent.insertBefore(aElem, jobsElements[i]);
      }
    }
  }
);

// Listen for message
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'COUNT') {
    console.log(`Current count is ${request.payload.count}`);
  }

  // Send an empty response
  // See https://github.com/mozilla/webextension-polyfill/issues/130#issuecomment-531531890
  sendResponse({});

  return true;
});
