const sel = document.getElementById('dropdown-select');
const info = document.getElementById('info-section');
const agencyName = document.getElementById('agency-name');
const requestsRender = document.getElementById('requests');

const data = [
  {
    agency: 'Texas Education Agency',
    requests: [
      {
        name: 'request 1',
        yOne: 25,
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
];

// data.map(agency => {
//   console.log(agency.agency.split(' ').join('&nbsp;'));
// });

// sel.innerHTML = '<option value="1">Hey!</option>';
let agencyOptions = [];
agencyOptions.push(`<option value="">--select--</option>`);
data
  .map(agency => {
    return agencyOptions.push(
      `<option value=${agency.agency.split(' ').join('&nbsp;')}>${
        agency.agency
      }</option>`
    );
  })
  .join('');
// console.log(agencyOptions);
// const final = agencyOptions.join('');
// console.log(final);

console.log('agencyOptions: ', agencyOptions);
sel.innerHTML = agencyOptions;

sel.onchange = function(e) {
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
  const found = data.find(
    agency => agency.agency.split(' ').join('') === val.split(' ').join('')
  );
  console.log('found: ', found);

  // Then pull all the data out of that items and populate the main page with
  // agency name
  agencyName.textContent = found.agency;

  // and request data
  let requests = [];
  found.requests.map(request => {
    return requests.push(`
      <ul class="request">
        <li class="req-info">${request.name}</li>
        <li class="req-info">${request.yOne}</li>
        <li class="req-info">${request.yTwo}</li>
        <li class="notes">${request.note}</li>
      </ul>
    `);
  });
  console.log(requests.join(''));
  requestsRender.innerHTML = requests.join('');
};
