// chrome.storage.sync.get(function(result){console.log(result)})

function sameDay(d1, d2) {
  return d1.getFullYear() === d2.getFullYear()
    && d1.getMonth() === d2.getMonth()
    && d1.getDate() === d2.getDate();
}

function pickNewQuote() {
  var request = new XMLHttpRequest();
  request.open('GET', 'lib/quotes.json', true);
  request.onload = function() {
    if (this.status >= 200 && this.status < 400) {
      // Success!
      var data = JSON.parse(this.response);
      // console.log(data);
      chrome.storage.sync.get('LOTRQuote', function(result) {
        let currQuote = result.LOTRQuote;

        // pick new quote
        let rand;
        do {
          rand = parseInt(Math.random() * data.length);
        } while(data[rand].quote === currQuote.quote);
        chrome.storage.sync.set({LOTRQuote: data[rand]});
      });
    } else {
      // We reached our target server, but it returned an error
    }
  };
  request.onerror = function() {
    // There was a connection error of some sort
  };
  request.send();
}

// set storage variables
chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({showAllQuotes: true});
  chrome.storage.sync.set({showResultsQuotes: true});
});

chrome.runtime.onStartup.addListener(function() {
  chrome.storage.sync.get('lastSetDateLOTR', function(result) {
    console.log('in storage: ' + result.lastSetDateLOTR);
    let today = new Date();
    console.log('today: ' + today.toString());
    if(typeof result.lastSetDateLOTR === 'undefined'
      || !sameDay(today, new Date(result.lastSetDateLOTR))) {
      chrome.storage.sync.set({lastSetDateLOTR: today.toString()}, function() {
        console.log('set to today date');
        // pick a quote for today
        pickNewQuote();
      });
    }
    else {
      console.log('did not set date');
    }
  });
  // chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
  //   chrome.declarativeContent.onPageChanged.addRules([{
  //     conditions: [new chrome.declarativeContent.PageStateMatcher({
  //       pageUrl: {hostEquals: ''},
  //     })],
  //       actions: [new chrome.declarativeContent.ShowPageAction()]
  //   }]);
  // });
});
