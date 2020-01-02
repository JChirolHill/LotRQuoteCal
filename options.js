let switch_all = document.getElementById('switch_all');
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

let switch_results = document.getElementById('switch_results');
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
