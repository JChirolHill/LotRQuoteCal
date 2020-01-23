// chrome.storage.sync.get(function(result){console.log(result)})

function sameDay(d1, d2) {
  return d1.getFullYear() === d2.getFullYear()
    && d1.getMonth() === d2.getMonth()
    && d1.getDate() === d2.getDate();
}

function pickNewQuote() {
  fetch('lib/quotes.json').then(r => r.json()).then(data => {
    console.log(data);
    chrome.storage.sync.get('LOTRQuote', function(result) {
      let currQuote = result.LOTRQuote;

      // pick new quote
      let rand;
      do {
        rand = parseInt(Math.random() * data.length);
      } while(data[rand].quote === currQuote.quote);
      chrome.storage.sync.set({LOTRQuote: data[rand]});
    });
  });
}

// set storage variables
chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({showAllQuotes: true});
  chrome.storage.sync.set({showResultsQuotes: false});
});

chrome.runtime.onStartup.addListener(function() {
  // get new quote
  chrome.storage.sync.get('lastSetDateLOTR', function(result) {
    let today = new Date();
    if(typeof result.lastSetDateLOTR === 'undefined'
      || !sameDay(today, new Date(result.lastSetDateLOTR))) {
      chrome.storage.sync.set({lastSetDateLOTR: today.toString()}, function() {
        // pick a quote for today
        pickNewQuote();
      });
    }
  });

  // check if events for today
  fetch('lib/dates.json').then(r => r.json()).then(data => {
    let today = new Date();
    let date = (today.getMonth() + 1).toString() + "/" + today.getDate();
    if(data[date]) { // there is an event today
      chrome.browserAction.setBadgeText({text: "!"});
      chrome.browserAction.setBadgeBackgroundColor({color: "green"});
    }
  });
});
