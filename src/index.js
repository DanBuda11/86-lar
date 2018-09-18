// DRY out the SCSS
// alphabetize everything & order by budget article
// add more agencies

// Import styles from main SCSS file
import './styles/main.scss';
// Import agency data from data file
import data from './data';

// Grab elements from HTML
const sel = document.getElementById('dropdown-select');
const agencyName = document.getElementById('agency-name');
const requestsRender = document.getElementById('requests');
const selector = document.querySelector('.selector');

// Populate the dropdown menu options with agency names and include a default
// value "Choose an agency..."
let agencyOptions = [];
agencyOptions.push(`<option value="">Choose an agency...</option>`);
data
  .map(agency => {
    return agencyOptions.push(`<option>${agency.agency}</option>`);
  })
  .join('');
sel.innerHTML = agencyOptions.join('');

// Add event listener to the select element and populate the data on the page when an agency
// is chosen
selector.addEventListener('change', function(e) {
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
        <li class="req-info"><p class="year">2020</p><p class="dollars">$${yOneDollar}</p></li>
        <li class="req-info"><p class="year">2021</p><p class="dollars">$${yTwoDollar}</p></li>
      </ul>`);
        } else {
          return requests.push(`
      <ul class="request">
        <li class="req-name">${request.name}</li>
        <li class="req-info"><p class="year">2020</p><p class="dollars">$${yOneDollar}</p></li>
        <li class="req-info"><p class="year">2021</p><p class="dollars">$${yTwoDollar}</p></li>
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
