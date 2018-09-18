// Import styles from main SCSS file
import './styles/main.scss';
// Import agency data from data file
import data from './data';

// Grab elements from HTML
const menu = document.getElementById('menu');
const agencyName = document.querySelector('.agency-name');
const requestsRender = document.getElementById('requests');

// Populate the dropdown menu options with agency names and include a default
// value "Choose an agency..."
let agencyOptions = [];
agencyOptions.push(`<option value="">Choose an agency...</option>`);

// Loop over the data and sort agencies into budget article group (1-8)
// and alphabetize agencies within those article groups
for (let i = 1; i < 9; i++) {
  // Array to temporarily store all agencies in a single budget article
  // in order to .sort() later
  let tempArray = [];
  // Push the article number as an <optgroup> to the final array to show up before
  // each agency in the dropdown list in that budget article
  agencyOptions.push(`<optgroup label="Article ${i.toString()}">`);
  // Map over the data and push the agency name to the tempArray if it has the same value
  // for article as the current value of i in the loop
  data.map(agency => {
    if (agency.article === i) {
      // push the agency name to tempArray
      tempArray.push(agency.agency);
    }
  });
  // Sort the agencies in tempArray alphabetically
  let sorted = tempArray.sort((a, b) => {
    let nameA = a.toLowerCase();
    let nameB = b.toLowerCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
  // Push the sorted agency names to the final array inside <option> tags
  sorted.map(agency => {
    agencyOptions.push(`<option>${agency}</option>`);
  });
  // Push the closing <optgroup> tag for each article set of agencies
  agencyOptions.push('</optgroup>');
}
// Push everything to the page/dropdown menu
menu.innerHTML = agencyOptions.join('');

// Add event listener to the select element and populate the data on the page when an agency
// is chosen
menu.addEventListener('change', function(e) {
  if (data.find(agency => agency.agency === e.target.value) !== undefined) {
    const found = data.find(agency => agency.agency === e.target.value);

    // Show the chosen agency's name on the page
    agencyName.textContent = found.agency;

    // Display a message that the selected agency has no exceptional item requests
    if (!found.requests) {
      requestsRender.innerHTML =
        '<p class="no-requests">This agency has no exceptional item requests.';
      // Display the agency's exceptional item requests
    } else {
      let requests = [];
      found.requests.map(request => {
        // Change number values to dollar amounts with commas
        let yOneDollar = request.yOne
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        let yTwoDollar = request.yTwo
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        if (!request.note || request.note === '') {
          return requests.push(`
      <ul class="request">
        <li class="req-name">${request.name}</li>
        <li class="req-info"><p>2020</p><p>$${yOneDollar}</p></li>
        <li class="req-info"><p>2021</p><p>$${yTwoDollar}</p></li>
      </ul>`);
        } else {
          return requests.push(`
      <ul class="request">
        <li class="req-name">${request.name}</li>
        <li class="req-info"><p>2020</p><p>$${yOneDollar}</p></li>
        <li class="req-info"><p>2021</p><p>$${yTwoDollar}</p></li>
        <li class="notes">Note: ${request.note}</li>
      </ul>
    `);
        }
      });
      // Populate the data onto the page
      requestsRender.innerHTML = requests.join('');
    }
  }
});
