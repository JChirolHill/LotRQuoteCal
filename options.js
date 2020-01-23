// set switches based on settings
let switch_all = document.getElementById('switch_all');
chrome.storage.sync.get('showAllQuotes', function(results) {
  console.log(results);
  switch_all.checked = !results.showAllQuotes;
});
let switch_results = document.getElementById('switch_results');
chrome.storage.sync.get('showResultsQuotes', function(results) {
  console.log(results);
  switch_results.checked = !results.showResultsQuotes;
});

// listener for display all quotes
console.log(switch_all);
switch_all.addEventListener('change', function() {
    if(this.checked) {
        // Checkbox is checked..
        document.getElementById('row_results').style.opacity = '0';
        chrome.storage.sync.set({showAllQuotes: false});
        chrome.storage.sync.set({showResultsQuotes: false});
    }
    else {
        // Checkbox is not checked..
        document.getElementById('row_results').style.opacity = '1';
        document.getElementById('switch_results').checked = false;
        chrome.storage.sync.set({showAllQuotes: true});
        chrome.storage.sync.set({showResultsQuotes: true});
    }
});

// listener for display quotes on results page
switch_results.addEventListener('change', function() {
    if(this.checked) {
        // Checkbox is checked..
        chrome.storage.sync.set({showResultsQuotes: false});
    }
    else {
        // Checkbox is not checked..
        chrome.storage.sync.set({showResultsQuotes: true});
    }
});
