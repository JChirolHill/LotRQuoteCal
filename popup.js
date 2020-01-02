let dateHTML = document.getElementById('date');
let eventsHTML = document.getElementById('events');
let quoteHTML = document.getElementById('quoteOfDay');

// display quote
chrome.storage.sync.get('LOTRQuote', function(results) {
  if(results.LOTRQuote !== undefined) {
    let quoteEl = document.createElement('div');
    quoteEl.innerHTML = results.LOTRQuote.quote;
    quoteEl.style.fontStyle = 'italic';
    quoteEl.style.color = 'var(--secondary)';
    quoteHTML.append(quoteEl);
    let speakerEl = document.createElement('div');
    speakerEl.innerHTML = '- ' + results.LOTRQuote.speaker;
    speakerEl.style.color = 'var(--secondary)';
    quoteHTML.append(speakerEl);
    quoteHTML.style.display = 'block';
  }
});

// get dates and display events
var request = new XMLHttpRequest();
request.open('GET', 'lib/dates.json', true);
request.onload = function() {
  if (this.status >= 200 && this.status < 400) {
    // Success!
    var data = JSON.parse(this.response);
    // console.log(data);

    // check if any matching dates
    let today = new Date();
    // let today = new Date("2019-03-14");
    dateHTML.innerHTML = today.toDateString();
    let date = (today.getMonth() + 1).toString() + "/" + today.getDate();
    if(data[date]) { // there is an event today
      for(var year in data[date]) {
        let div = document.createElement('div');
        let yearHTML = document.createElement('div');
        yearHTML.setAttribute('class', 'year');
        yearHTML.innerHTML = 'Year ' + year;
        div.appendChild(yearHTML);
        let eventHTML = document.createElement('div');
        eventHTML.innerHTML = data[date][year];
        div.appendChild(eventHTML);
        eventsHTML.appendChild(div);
      };
    }
    else { // no events today
      let emptyDiv = document.createElement('div');
      emptyDiv.innerHTML = 'There are no events in Middle Earth today.';
      emptyDiv.setAttribute('style', 'color: var(--secondary);');
      eventsHTML.appendChild(emptyDiv);
    }
  } else {
    // We reached our target server, but it returned an error
  }
};
request.onerror = function() {
  // There was a connection error of some sort
};
request.send();