const sel = document.getElementById('dropdown-select');
const agencyInput = document.getElementById('agency-input');
const info = document.getElementById('info-section');
const agencyName = document.getElementById('agency-name');
const requestsRender = document.getElementById('requests');
const columnNames = document.getElementById('column-names');

// Mostl likely use one of these
// agencyInput.addEventListener('change', function(e) {
//   console.log('change: ', e.target.value);
// });
// agencyInput.addEventListener('keyup', function(e) {
//   console.log('keyup: ', e.target.value);
// });

agencyInput.addEventListener('input', function(e) {
  console.log('input: ', e.target.value);

  // Need to do something so that only when an agency name match is clicked/submitted/written in fully,
  // only THEN run code that populates the requests area for that agency

  if (data.find(agency => agency.agency === e.target.value) !== undefined) {
    console.log('found one!');
    const found = data.find(agency => agency.agency === e.target.value);

    agencyName.textContent = found.agency;

    if (!found.requests) {
      console.log('NO REQUESTS!');
      columnNames.classList.remove('open');
      requestsRender.innerHTML =
        '<p class="no-requests">This agency has no exceptional item requests.';
    } else {
      console.log('REQUESTS FOUND!');

      columnNames.classList.add('open');

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
    }
    agencyInput.value = '';
  }

  // if (e.target.value) {
  //   const found = data.find(agency => agency.agency === e.target.value);
  //   console.log('found: ', found);
  // }
});

// Should I do a type-in search bar instead of a dropdown? It'd probably be A LOT easier
// to search...
// especially for things like Texas Bond Review Board when people are probably used to just
// looking for Bond Review Board

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
    agency: 'Cancer Prevention and Research Insitute of Texas',
    requests: [
      {
        name: 'Restore Cancer Research and Prevention Grant Funding',
        yOne: 82000000,
        yTwo: 82000000,
      },
      {
        name: '1 New Systems Analyst FTE',
        yOne: 0,
        yTwo: 0,
        note:
          'Net zero cost comes from combination of $85,000 salary and $5,215 in Other Operating Expense against $90,215 from Professional Fees & Services.',
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
  {
    agency: 'Texas Bond Review Board',
    requests: [
      {
        name: 'Database Management, Training and Additional Development',
        yOne: 21000,
        yTwo: 21000,
      },
      {
        name: 'Public Official Liability (D&O) insurance coverage',
        yOne: 6000,
        yTwo: 6000,
      },
      {
        name: 'Website Upgrade',
        yOne: 100000,
        yTwo: 6000,
      },
      {
        name: 'Disclosure/Tax Counsel',
        yOne: 10000,
        yTwo: 10000,
      },
    ],
  },
  {
    agency: 'Commission on State Emergency Communications',
    requests: [
      {
        name:
          'Regional Planning Commission Grant Equipment Replacement and Maintenance',
        yOne: 6377477,
        yTwo: 2265994,
      },
      {
        name: 'Maintain RPCC SPI Staffing at current levels',
        yOne: 370965,
        yTwo: 370965,
      },
      {
        name: 'Restore Poison Network Capacity',
        yOne: 1277678,
        yTwo: 1277678,
      },
      {
        name: 'TPCN Disaster Recovery Mitigation Site',
        yOne: 182400,
        yTwo: 87540,
      },
      {
        name: 'CSEC Process Automation',
        yOne: 789910,
        yTwo: 115350,
      },
      {
        name: 'TPCN Medical Directors',
        yOne: 781355,
        yTwo: 781355,
      },
      {
        name: 'TPCN Managing Directors',
        yOne: 346396,
        yTwo: 346396,
      },
      {
        name: 'Public Education and Awareness',
        yOne: 178000,
        yTwo: 456000,
      },
      {
        name: 'CSEC Agency CAPPS Implementation',
        yOne: 121800,
        yTwo: 111100,
      },
    ],
  },
  {
    agency: 'Banking Commission',
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

sel.onsubmit = function(e) {
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
        <li class="req-name">${request.name}</li>
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
