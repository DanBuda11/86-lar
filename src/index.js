import './styles/main.scss';
import data from './data';

const sel = document.getElementById('dropdown-select');
const agencyName = document.getElementById('agency-name');
const requestsRender = document.getElementById('requests');
const selector = document.querySelectorAll('.selector');

// Sort agencies alphabetically in the dropdown/datalist
// AND separate them by budget article!!! So basically they show
// up in the same order as on the LBB website

// To complete:
  // alphabetize everything & order by budget article
  // finish styling including for phone and tablet
  // clean up and DRY code including SCSS nesting and remove unnecessary SCSS
  // comment everything
  // finish readme
  // add more agencies)
  // can I make the header and footer a cool image darkened with white text over it?
    // Like a money image or something?

selector.forEach(function(select) {
  select.addEventListener('change', function(e) {
    if (data.find(agency => agency.agency === e.target.value) !== undefined) {
      const found = data.find(agency => agency.agency === e.target.value);

      agencyName.textContent = found.agency;

      if (!found.requests) {
        requestsRender.innerHTML =
          '<p class="no-requests">This agency has no exceptional item requests.';
      } else {
        let requests = [];
        found.requests.map(request => {
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
        requestsRender.innerHTML = requests.join('');
      }
    }
  });
});

let agencyOptions = [];
agencyOptions.push(`<option value="">Choose an agency...</option>`);
data
  .map(agency => {
    return agencyOptions.push(`<option>${agency.agency}</option>`);
  })
  .join('');

sel.innerHTML = agencyOptions.join('');
