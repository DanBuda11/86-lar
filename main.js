// Polyfill for datalist
// Will need to clean up my code as it only kinda works on ios Chrome right now
!(function() {
  'use strict';
  var e = window.document,
    t = window.navigator.userAgent,
    i =
      'list' in e.createElement('input') &&
      Boolean(e.createElement('datalist') && window.HTMLDataListElement),
    a = Boolean(-1 !== t.indexOf('Trident/') || -1 !== t.indexOf('Edge/'));
  if (i && !a) return !1;
  Element.prototype.matches ||
    (Element.prototype.matches = Element.prototype.msMatchesSelector);
  var n = !1,
    l = 13,
    r = 27,
    o = 38,
    s = 40,
    u = ' / ',
    d = ['text', 'email', 'number', 'search', 'tel', 'url'],
    p = 'polyfilled',
    c = 'polyfilling',
    v = '###[P0LYFlLLed]###';
  window.addEventListener('touchstart', function e() {
    (n = !0), window.removeEventListener('touchstart', e);
  });
  var y = window.MutationObserver || window.WebKitMutationObserver,
    f;
  void 0 !== y &&
    (f = new y(function(t) {
      var i = !1;
      if (
        (t.forEach(function(e) {
          for (var t = 0; t < e.addedNodes.length; ++t)
            'datalist' === e.target.tagName.toLowerCase() && (i = e.target);
        }),
        i)
      ) {
        var a = e.querySelector('input[list="' + i.id + '"]');
        '' !== a.value &&
          x(E(i, a).length, i.getElementsByClassName('polyfilling')[0]);
      }
    }));
  var g = function(e) {
      var t = e.target,
        i = t.list,
        l = 38 === e.keyCode || 40 === e.keyCode;
      if ('input' === t.tagName.toLowerCase() && null !== i) {
        if (a)
          return void (
            '' === t.value ||
            l ||
            13 === e.keyCode ||
            27 === e.keyCode ||
            (m(t, i), t.focus())
          );
        var r = !1,
          o = i.getElementsByClassName('polyfilling')[0] || C(t, i);
        if (
          27 !== e.keyCode &&
          13 !== e.keyCode &&
          ('' !== t.value || l) &&
          void 0 !== o
        ) {
          E(i, t).length > 0 && (r = !0);
          var s = 0,
            u = o.options.length - 1;
          n
            ? (o.selectedIndex = 0)
            : l &&
              'number' !== t.getAttribute('type') &&
              ((o.selectedIndex = 38 === e.keyCode ? u : 0), o.focus());
        }
        x(r, o);
      }
    },
    m = function(e, t) {
      Array.prototype.slice.call(t.options, 0).forEach(function(t) {
        var i = t.dataset.originalvalue || t.value;
        t.dataset.originalvalue || (t.dataset.originalvalue = i),
          t.label || t.text || (t.label = i),
          (t.value = h(t, e.value)
            ? e.value + '###[P0LYFlLLed]###' + i.toLowerCase()
            : i);
      });
    },
    b = function(e) {
      var t = e.target,
        i = t.list;
      if (t.matches('input[list]') && t.matches('.polyfilled') && i) {
        var a = i.querySelector(
          'option[value="' + t.value.replace(/\\([\s\S])|(")/g, '\\$1$2') + '"]'
        );
        a && a.dataset.originalvalue && (t.value = a.dataset.originalvalue);
      }
    },
    h = function(e, t) {
      var i = e.value.toLowerCase(),
        a = t.toLowerCase(),
        n = e.getAttribute('label'),
        l = e.text.toLowerCase();
      return Boolean(
        !1 === e.disabled &&
          (('' !== i && -1 !== i.indexOf(a)) ||
            (n && -1 !== n.toLowerCase().indexOf(a)) ||
            ('' !== l && -1 !== l.indexOf(a)))
      );
    },
    w = function(e) {
      if (e.target.matches('input[list]')) {
        var t = e.target,
          i = t.list;
        if (
          'input' === t.tagName.toLowerCase() &&
          null !== i &&
          (t.matches('.polyfilled') ||
            (t.setAttribute('autocomplete', 'off'),
            t.setAttribute('role', 'textbox'),
            t.setAttribute('aria-haspopup', 'true'),
            t.setAttribute('aria-autocomplete', 'list'),
            t.setAttribute('aria-owns', t.getAttribute('list')),
            'focusin' === e.type
              ? (t.addEventListener('keyup', g),
                t.addEventListener('focusout', w, !0),
                a && t.addEventListener('input', b))
              : 'blur' === e.type &&
                (t.removeEventListener('keyup', g),
                t.removeEventListener('focusout', w, !0),
                a && t.removeEventListener('input', b)),
            (t.className += ' polyfilled')),
          !a)
        ) {
          var n = i.getElementsByClassName('polyfilling')[0] || C(t, i),
            l =
              n &&
              n.querySelector('option:not(:disabled)') &&
              (('focusin' === e.type && '' !== t.value) ||
                (e.relatedTarget && e.relatedTarget === n));
          x(l, n);
        }
      }
    };
  if ((e.addEventListener('focusin', w, !0), !a)) {
    var E = function(t, i) {
        void 0 !== f && f.disconnect();
        var a = t.getElementsByClassName('polyfilling')[0] || C(i, t),
          l = i.value,
          r = e.createDocumentFragment(),
          o = e.createDocumentFragment();
        'email' === i.getAttribute('type') &&
          null !== i.getAttribute('multiple') &&
          (l = l.substring(l.lastIndexOf(',') + 1)),
          Array.prototype.slice
            .call(t.querySelectorAll('option:not(:disabled)'))
            .sort(function(e, t) {
              var a = e.value,
                n = t.value;
              return (
                'url' === i.getAttribute('type') &&
                  ((a = a.replace(/(^\w+:|^)\/\//, '')),
                  (n = n.replace(/(^\w+:|^)\/\//, ''))),
                a.localeCompare(n)
              );
            })
            .forEach(function(e) {
              var t = e.value,
                i = e.getAttribute('label'),
                a = e.text;
              if (h(e, l)) {
                var n = a.substr(0, t.length + ' / '.length),
                  s = t + ' / ';
                a && !i && a !== t && n !== s
                  ? (e.innerText = t + ' / ' + a)
                  : e.text || (e.innerText = i || t),
                  r.appendChild(e);
              } else o.appendChild(e);
            }),
          a.appendChild(r);
        var s = a.options.length;
        return (
          (a.size = s > 10 ? 10 : s),
          (a.multiple = !n && s < 2),
          (t.getElementsByClassName('ie9_fix')[0] || t).appendChild(o),
          void 0 !== f && f.observe(t, { childList: !0 }),
          a.options
        );
      },
      C = function(t, i) {
        if (-1 !== d.indexOf(t.getAttribute('type')) && null !== i) {
          var a = t.getClientRects(),
            l = window.getComputedStyle(t),
            r = e.createElement('select');
          if (
            (r.setAttribute('class', 'polyfilling'),
            (r.style.position = 'absolute'),
            x(!1, r),
            r.setAttribute('tabindex', '-1'),
            r.setAttribute('aria-live', 'polite'),
            r.setAttribute('role', 'listbox'),
            n || r.setAttribute('aria-multiselectable', 'false'),
            'block' === l.getPropertyValue('display'))
          )
            r.style.marginTop = '-' + l.getPropertyValue('margin-bottom');
          else {
            var o =
              'rtl' === l.getPropertyValue('direction') ? 'right' : 'left';
            r.style.setProperty(
              'margin-' + o,
              '-' +
                (a[0].width + parseFloat(l.getPropertyValue('margin-' + o))) +
                'px'
            ),
              (r.style.marginTop =
                parseInt(a[0].height + (t.offsetTop - i.offsetTop), 10) + 'px');
          }
          if (
            ((r.style.borderRadius = l.getPropertyValue('border-radius')),
            (r.style.minWidth = a[0].width + 'px'),
            n)
          ) {
            var s = e.createElement('option');
            (s.innerText = i.title),
              (s.disabled = !0),
              s.setAttribute('class', 'message'),
              r.appendChild(s);
          }
          return (
            i.appendChild(r),
            n
              ? r.addEventListener('change', k)
              : r.addEventListener('click', k),
            r.addEventListener('blur', k),
            r.addEventListener('keydown', k),
            r.addEventListener('keypress', L),
            r
          );
        }
      },
      L = function(t) {
        var i = t.target,
          a = i.parentNode,
          n = e.querySelector('input[list="' + a.id + '"]');
        'select' === i.tagName.toLowerCase() &&
          null !== n &&
          (!t.key ||
            ('Backspace' !== t.key && 1 !== t.key.length) ||
            (n.focus(),
            'Backspace' === t.key
              ? ((n.value = n.value.substr(0, n.value.length - 1)), A(n))
              : (n.value += t.key),
            E(a, n)));
      },
      k = function(t) {
        var i = t.currentTarget,
          a = i.parentNode,
          n = e.querySelector('input[list="' + a.id + '"]');
        if ('select' === i.tagName.toLowerCase() && null !== n) {
          var l = t.type,
            r = 'keydown' === l && 13 !== t.keyCode && 27 !== t.keyCode;
          if (
            ('change' === l ||
              'click' === l ||
              ('keydown' === l && (13 === t.keyCode || 'Tab' === t.key))) &&
            i.value.length > 0 &&
            i.value !== a.title
          ) {
            var o;
            (n.value =
              'email' === n.getAttribute('type') &&
              null !== n.getAttribute('multiple') &&
              (o = n.value.lastIndexOf(',')) > -1
                ? n.value.slice(0, o) + ',' + i.value
                : (n.value = i.value)),
              A(n),
              'Tab' !== t.key && n.focus(),
              (r = !1);
          } else 'keydown' === l && 27 === t.keyCode && n.focus();
          x(r, i);
        }
      },
      A = function(t) {
        var i;
        'function' == typeof Event
          ? (i = new Event('input', { bubbles: !0 }))
          : ((i = e.createEvent('Event')), i.initEvent('input', !0, !1)),
          t.dispatchEvent(i);
      },
      x = function(t, i) {
        t
          ? i.removeAttribute('hidden')
          : i.setAttributeNode(e.createAttribute('hidden')),
          i.setAttribute('aria-hidden', (!t).toString());
      };
    !(function(t) {
      t &&
        t.prototype &&
        void 0 === t.prototype.list &&
        Object.defineProperty(t.prototype, 'list', {
          get: function() {
            var i = e.getElementById(this.getAttribute('list'));
            return 'object' == typeof this &&
              this instanceof t &&
              i &&
              i.matches('datalist')
              ? i
              : null;
          },
        });
    })(window.HTMLInputElement),
      (function(e) {
        e &&
          e.prototype &&
          void 0 === e.prototype.options &&
          Object.defineProperty(e.prototype, 'options', {
            get: function() {
              return 'object' == typeof this && this instanceof e
                ? this.getElementsByTagName('option')
                : null;
            },
          });
      })(window.HTMLElement);
  }
})();

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
        name: 'Safe and Healthy Schools Initiative',
        yOne: 53728500,
        yTwo: 750000,
      },
      {
        name: 'Special Education Supports',
        yOne: 50478500,
        yTwo: 0,
      },
      {
        name: 'Windham School District Program Expansion',
        yOne: 5269024,
        yTwo: 4786030,
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
        name: 'Toward EXcellence, Access, and Success Grants',
        yOne: 36700000,
        yTwo: 70600000,
      },
      {
        name: 'Support Critical Agency Operations',
        yOne: 1123700,
        yTwo: 1123700,
      },
      {
        name: 'IT Application Portfolio Modernization',
        yOne: 520000,
        yTwo: 520000,
      },
      {
        name: 'GradTX Consotrium',
        yOne: 250000,
        yTwo: 250000,
      },
      {
        name: 'Support Transfer Initiatives',
        yOne: 25000,
        yTwo: 25000,
      },
      {
        name: 'Support 60x30TX Regional Strategies',
        yOne: 650000,
        yTwo: 650000,
      },
      {
        name: 'TSIA Enhancement and Success',
        yOne: 1000000,
        yTwo: 0,
      },
      {
        name: 'Access to Out-of-State Student Data',
        yOne: 135000,
        yTwo: 135000,
      },
      {
        name: 'Enhance Compliance Monitoring',
        yOne: 352800,
        yTwo: 354650,
      },
      {
        name: 'Graduate Medical Education',
        yOne: 30337500,
        yTwo: 30337500,
      },
      {
        name: 'Financial Literacy Initiatives',
        yOne: 50000,
        yTwo: 50000,
      },
      {
        name: 'Open Education Resources Repository',
        yOne: 160000,
        yTwo: 90000,
      },
      {
        name: 'Open Education Resource Grants',
        yOne: 100000,
        yTwo: 100000,
      },
      {
        name: 'Family Education Coordinating Board',
        yOne: 1000000,
        yTwo: 1000000,
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
  {
    agency: 'School for the Deaf',
    requests: [
      {
        name:
          'Unmet Staff Needs in Special Education Direct Services and Safety',
        yOne: 835531,
        yTwo: 835531,
      },
      {
        name:
          'Capital Equipment Request for Campus Security and Dorm Furniture',
        yOne: 935000,
        yTwo: 500000,
      },
      {
        name: '2020/2021 Transportation Items',
        yOne: 160000,
        yTwo: 160000,
      },
      {
        name: 'Salary Increase for Underpaid Critical Staff',
        yOne: 290394,
        yTwo: 290394,
      },
      {
        name: 'Master Plan Phase 2, New and Repurposed Facilities',
        yOne: 26105209,
        yTwo: 0,
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
