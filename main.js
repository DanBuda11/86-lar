const sel = document.getElementById('dropdown-select');
const info = document.getElementById('info-section');
const agencyName = document.getElementById('agency-name');
const requestsRender = document.getElementById('requests');
const columnNames = document.getElementById('column-names');

const data = [
  {
    agency: 'Texas Education Agency',
    requests: [
      {
        name: 'request 1',
        yOne: 25000000,
        yTwo: 50,
        note:
          'Sunt deserunt labore tempor laboris amet dolor dolore incididunt in.',
      },
      {
        name: 'request 2',
        yOne: 75,
        yTwo: 100,
        note: 'Tempor adipisicing veniam in quis voluptate est ex nostrud.',
      },
    ],
  },
  {
    agency: 'CPRIT',
    requests: [
      {
        name: 'request 3',
        yOne: 500,
        yTwo: 70808,
        note:
          'Labore labore sint consectetur labore cupidatat ex dolore minim non labore officia nisi eiusmod velit.',
      },
    ],
  },
  {
    agency: 'Texas Higher Education Coordinating Board',
    requests: [
      {
        name: 'popsicles',
        yOne: 17.5,
        yTwo: 2000000,
      },
    ],
  },
];

// data.map(agency => {
//   console.log(agency.agency.split(' ').join('&nbsp;'));
// });

// sel.innerHTML = '<option value="1">Hey!</option>';
let agencyOptions = [];
agencyOptions.push(`<option value="">--select--</option>`);
data
  .map(agency => {
    return agencyOptions.push(`<option>${agency.agency}</option>`);
  })
  .join('');
// console.log(agencyOptions);
// const final = agencyOptions.join('');
// console.log(final);

// console.log('agencyOptions: ', agencyOptions);
sel.innerHTML = agencyOptions;

sel.onchange = function(e) {
  columnNames.classList.add('open');

  console.log('sel.value: ', sel.value);
  // console.log('fuck');
  console.log('e.target.value: ', e.target.value);
  let val = sel.value;
  console.log('val: ', val);
  // Run over the data array and find where val matches the agency name
  // data.forEach(agency => {
  //   console.log('agency name: ', agency.agency);
  //   console.log('val: ', val);
  // });
  if (e.target.value === val) {
    console.log('ok!');
  } else {
    console.log('god dammit!');
  }
  const found = data.find(agency => agency.agency === sel.value);
  console.log('found: ', found);
  // console.log('found.agency: ', found.agency);
  // Then pull all the data out of that items and populate the main page with
  // agency name
  agencyName.textContent = found.agency;

  // and request data
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
        <li class="req-info">${request.name}</li>
        <li class="req-info">$${yOneDollar}</li>
        <li class="req-info">$${yTwoDollar}</li>
      </ul>`);
    } else {
      return requests.push(`
      <ul class="request">
        <li class="req-name">${request.name}</li>
        <li class="req-info">$${yOneDollar}</li>
        <li class="req-info">$${yTwoDollar}</li>
        <li class="notes">${request.note}</li>
      </ul>
    `);
    }
  });
  console.log(requests.join(''));
  requestsRender.innerHTML = requests.join('');
};
