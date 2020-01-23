// remove the badge on browseraction
chrome.browserAction.setBadgeText({text: ''});

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
fetch('lib/dates.json').then(r => r.json()).then(data => {
  // check if any matching dates
  let today = new Date();
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
});
