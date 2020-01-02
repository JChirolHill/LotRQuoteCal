chrome.storage.sync.get('showAllQuotes', function(results) {
  // only get quote if user accepts having quotes
  if(results.showAllQuotes === true) {
    chrome.storage.sync.get('LOTRQuote', function(results) {
      if(results.LOTRQuote !== undefined) {
        let url = window.location.href;

        let quoteDiv = document.createElement('div');
        quoteDiv.innerHTML = `
          <span style="font-style: italic;">
            ${results.LOTRQuote.quote}
          </span>- ${results.LOTRQuote.speaker}`;

        if(url.match(/.*\/duckduckgo\.com\/\?q=.+/)) { // duckduckgo results
          chrome.storage.sync.get('showResultsQuotes',  function(results) {
            if(results.showResultsQuotes) {
              quoteDiv.style.textAlign = 'left';
              quoteDiv.style.width = '80%';
              quoteDiv.style.margin = '0 auto';
              let appendTo = document.getElementById('header');
              let before = document.getElementById('duckbar');
              appendTo.insertBefore(quoteDiv, before);
            }
          });
        }
        else if(url.match(/.*\/www\.google\.com\/search.+/)) { // google results
          chrome.storage.sync.get('showResultsQuotes',  function(results) {
            if(results.showResultsQuotes) {
              let appendTo = document.getElementById('sfcnt');
              quoteDiv.style.textAlign = 'left';
              quoteDiv.style.width = '80%';
              quoteDiv.style.margin = '-10px auto 25px auto';
              appendTo.append(quoteDiv);
              let below = document.getElementById('hdtb-msb');
              below.style.margin = '-15px';
            }
          });
        }
        else if(url.match(/.*\/duckduckgo\.com.*/)) { // duckduckgo home
          quoteDiv.style.textAlign = 'center';
          quoteDiv.style.width = '60%';
          quoteDiv.style.margin = '0 auto';
          let appendTo = document.getElementById('content_homepage');
          appendTo.append(quoteDiv);
        }
        else if(url.match(/.*www.google.com.*/)) { // google home
          quoteDiv.style.textAlign = 'center';
          quoteDiv.style.width = '80%';
          quoteDiv.style.margin = '10px auto 0 auto';
          let appendTo = document.getElementById('tophf').nextElementSibling;
          appendTo.append(quoteDiv);
          let below = document.getElementsByClassName('FPdoLc')[0];
          below.style.top = '70px';
        }
      }
    });
  }
});
