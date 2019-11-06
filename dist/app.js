(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var readyToPay = Object.freeze({
	travel: "\n\t\t\tflight bank mission photoshop suites inn\n\t\t\thospitality shuttle lodging\n\t\t\tpublication llamas\n\t\t",
	food: "\n\t\t\tbarnes sub coffee tea getaway stater pizza bbq starbucks restaurant\n\t\t\tsmart cafe coffee tea gra-pow thai lunch restaurants intermediate\n\t\t"
});

exports.default = readyToPay;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var reviewing = "\n\t10890351\n\t10928190\n\t10936095\n\t10939286\n\t10946741\n\t10951937\n\t10954269\n\t10955047\n\t10957634\n\t10958450\n\t10958934\n\t10960062\n\t10960342\n\t10961291\n\t10961732\n\t10962348\n\t10963183\n\t10963352\n\t10964802\n\t10964982\n\t10965054\n\t10966165\n\t10976510\n\t10971943\n\t10971321\n\t10971025\n\t10970473\n\t10976691\n\t10977001\n\t10975983\n\t10973323\n\t10981780\n\t10976855\n\t10968622\n\t10977536\n\t10971831\n\t10971803\n\t10975643\n\t10983365\n\t10971949\n\t10976404\n\t10976403\n\t10976847\n\t10977236\n\t10977462\n\t10979307\n\t10979554\n\t10980512\n\t10980703\n\t10981674\n\t10982036\n\t10984336\n\t10983632\n\t10984329\n\t10985420\n\t10985670\n\t10984858\n\t10985448\n\t10988098\n\t10985747\n\t10985526\n\t10986081\n\t10986026\n\t10988023\n\t10989441\n\t10989409\n\t10990246\n\t10990244\n\t10992502\n\t10992505\n\t10993574\n";

exports.default = reviewing;

},{}],3:[function(require,module,exports){
'use strict';

var _helpers = require('./helpers.js');

var _helpers2 = _interopRequireDefault(_helpers);

var _readyToPay = require('../data/readyToPay.js');

var _readyToPay2 = _interopRequireDefault(_readyToPay);

var _reviewing = require('../data/reviewing.js');

var _reviewing2 = _interopRequireDefault(_reviewing);

var _presets = require('./presets.js');

var _presets2 = _interopRequireDefault(_presets);

var _rowElements = require('./rowElements.js');

var _rowElements2 = _interopRequireDefault(_rowElements);

var _columns = require('./columns.js');

var _columns2 = _interopRequireDefault(_columns);

var _email = require('./email.js');

var _email2 = _interopRequireDefault(_email);

var _format = require('./format.js');

var _format2 = _interopRequireDefault(_format);

var _poNumberClick = require('./poNumberClick.js');

var _poNumberClick2 = _interopRequireDefault(_poNumberClick);

var _poSearch = require('./poSearch.js');

var _poSearch2 = _interopRequireDefault(_poSearch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// app helpers
var hasTextInURL = _helpers2.default.hasTextInURL,
    docReady = _helpers2.default.docReady;

// check before doc ready


// app functions


// app settings


// app data

if (hasTextInURL('po_receive') || hasTextInURL('DisplayPrintOptions')) {
	var listenForPopUp = setInterval(function () {
		var closed = false;
		if (!closed && (hasTextInURL('po_receive') || hasTextInURL('DisplayPrintOptions'))) {
			closed = true;
			window.close();
			clearInterval(listenForPopUp);
		}
	}, 100);
}

// when dom is ready
docReady(function () {

	(0, _format2.default)({ readyToPay: _readyToPay2.default, reviewing: _reviewing2.default, helpers: _helpers2.default, presets: _presets2.default, rowElements: _rowElements2.default });

	(0, _poNumberClick2.default)({ helpers: _helpers2.default, columns: _columns2.default, email: _email2.default });

	(0, _poSearch2.default)({ helpers: _helpers2.default, rowElements: _rowElements2.default, presets: _presets2.default });
});

},{"../data/readyToPay.js":1,"../data/reviewing.js":2,"./columns.js":4,"./email.js":5,"./format.js":6,"./helpers.js":7,"./poNumberClick.js":8,"./poSearch.js":9,"./presets.js":10,"./rowElements.js":11}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var columns = Object.freeze({
    dateCol: 2,
    nameCol: 3,
    poNumberCol: 4,
    vendorCol: 5,
    descriptionCol: 6,
    poTotalCol: 8,
    totalPaidCol: 9
});

exports.default = columns;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var email = function email(_ref, helpers) {
  var digits = _ref.digits,
      name = _ref.name,
      poNumber = _ref.poNumber,
      date = _ref.date,
      vendor = _ref.vendor,
      description = _ref.description,
      poTotal = _ref.poTotal,
      totalPaid = _ref.totalPaid;
  var toTitleCase = helpers.toTitleCase;

  return "Status of PO " + digits + "\nHi " + name + ", are all items in this PO received?\n\nPO: " + poNumber + "\nPO Date: " + date + "\nVendor: " + toTitleCase(vendor) + "\nDescription: " + description + "\nTotal: $" + poTotal + "\nTotal Paid (by Accounting): $" + (totalPaid ? totalPaid : 0) + "\n\nAbraham\n";
};

exports.default = email;

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _templateObject = _taggedTemplateLiteral(['\n\t\t\t<span class="banner-', '">', ' new</span>\n\t\t\t<span class="banner-', '">', ' paid</span>\n\t\t\t<span class="banner-', '">', ' aged</span>\n\t\t\t<span class="banner-', '">', ' costly</span>\n\t\t\t<span class="banner-', '">', ' ghosted</span>\n\t\t\t<span class="banner-', '">', ' reviewed</span>\n\t\t\t<span class="banner-', '">', ' ready</span>\n\t\t\t'], ['\n\t\t\t<span class="banner-', '">', ' new</span>\n\t\t\t<span class="banner-', '">', ' paid</span>\n\t\t\t<span class="banner-', '">', ' aged</span>\n\t\t\t<span class="banner-', '">', ' costly</span>\n\t\t\t<span class="banner-', '">', ' ghosted</span>\n\t\t\t<span class="banner-', '">', ' reviewed</span>\n\t\t\t<span class="banner-', '">', ' ready</span>\n\t\t\t']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var format = function format(_ref) {
	var readyToPay = _ref.readyToPay,
	    reviewing = _ref.reviewing,
	    helpers = _ref.helpers,
	    presets = _ref.presets,
	    rowElements = _ref.rowElements;
	var hasTextInURL = helpers.hasTextInURL,
	    patch = helpers.patch,
	    html = helpers.html,
	    queryFirst = helpers.queryFirst,
	    textToNumber = helpers.textToNumber;
	var daysNew = presets.daysNew,
	    daysAged = presets.daysAged,
	    costlyPrice = presets.costlyPrice,
	    percentRequiredTillPaid = presets.percentRequiredTillPaid;
	var rows = rowElements.rows,
	    tableDates = rowElements.tableDates,
	    tablePOs = rowElements.tablePOs,
	    tableVendors = rowElements.tableVendors,
	    tableDescriptions = rowElements.tableDescriptions,
	    tablePrices = rowElements.tablePrices,
	    tablePayments = rowElements.tablePayments;
	var travel = readyToPay.travel,
	    food = readyToPay.food;

	// banner counters

	var newPO = 0,
	    paidPO = 0,
	    agedPO = 0,
	    costlyPO = 0,
	    ghostedPO = 0,
	    reviewPO = 0,
	    readyPO = 0;
	var len = tablePrices.length; // table length

	// row conditional formatting

	var _loop = function _loop(i) {
		var thisRow = rows[i + 1];
		var poPriceEl = tablePrices[i];
		var poPaidEl = tablePayments[i];
		var amtPrice = textToNumber(poPriceEl.innerHTML);
		var amtPaid = textToNumber(poPaidEl.innerHTML);

		var poVendor = tableVendors[i].innerHTML.toLowerCase();
		var poDescription = tableDescriptions[i].innerHTML.toLowerCase();
		var poNumber = tablePOs[i].innerHTML;
		var poDate = tableDates[i].innerHTML;

		tablePOs[i].classList.add('btn-po-number');

		// ghost POs
		var ghosted = function ghosted(x) {
			return (/O[WV]|NU/.test(x)
			);
		};
		if (ghosted(poNumber)) {
			thisRow.classList.add('ghost');ghostedPO++;
		}

		// costly, bkm and paid POs
		if (!ghosted(poNumber) && amtPrice >= costlyPrice) {
			poPriceEl.classList.add('highlight-costly');costlyPO++;
			// bkm
			if (new RegExp('bkm|wmk', 'gi').test(poVendor)) {
				thisRow.classList.add('highlight-bkm');
			}
		} else if (amtPaid >= amtPrice * percentRequiredTillPaid) {
			poPriceEl.classList.add('highlight-paid');
			poPaidEl.classList.add('highlight-paid');paidPO++;
		}

		// ready to receive and in review POs
		var templateToList = function templateToList(str) {
			return str.replace(/\t|\n/gm, ' ').split(' ').filter(function (x) {
				return x;
			});
		};
		var listToRegExp = function listToRegExp(list) {
			return new RegExp(templateToList(list).join('|'), 'gi');
		};

		// if not ghosted and ready to pay or zero price
		if (!ghosted(poNumber) && (listToRegExp(travel).test(poVendor) || listToRegExp(travel).test(poDescription) || listToRegExp(food).test(poVendor) // removed condition: amtPrice%1 !== 0
		|| listToRegExp(food).test(poDescription) || amtPrice === 0)) {
			thisRow.classList.add('ready');readyPO++;
		}

		if (listToRegExp(reviewing).test(poNumber)) {
			thisRow.classList.add('reviewing');reviewPO++;
		}

		// aged POs
		var numericDate = function numericDate(d) {
			return Math.floor(d.getTime() / (3600 * 24 * 1000));
		};

		if (!ghosted(poNumber) && numericDate(new Date()) - numericDate(new Date(poDate)) >= daysAged) {
			thisRow.classList.add('outdated');agedPO++;
		}

		// new POs
		if (!ghosted(poNumber) && numericDate(new Date()) - numericDate(new Date(poDate)) <= daysNew) {
			thisRow.classList.add('new-this-week');newPO++;
		}
	};

	for (var i = 0; i < len; i++) {
		_loop(i);
	}

	// create notification banner based on formatting totals
	if (hasTextInURL('po_search')) {
		var contentEl = queryFirst('.content');
		var bannerEl = document.createElement('banner');
		//insert banner element
		contentEl.insertBefore(bannerEl, contentEl.firstChild);
		// patch banner element
		patch(queryFirst('banner'), html(_templateObject, newPO ? 'new' : 'zero', newPO || 0, paidPO ? 'paid' : 'zero', paidPO || 0, agedPO ? 'aged' : 'zero', agedPO || 0, costlyPO ? 'high' : 'zero', costlyPO || 0, ghostedPO ? 'ghost' : 'zero', ghostedPO || 0, reviewPO ? 'review' : 'zero', reviewPO || 0, readyPO ? 'ready' : 'zero', readyPO || 0));
	}
};

exports.default = format;

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
		value: true
});
var helpers = Object.freeze({
		// url checker
		hasTextInURL: function hasTextInURL(x) {
				var w = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;
				return new RegExp(x, 'gi').test(w.location.href);
		},

		// 6 line JSX alternative, patch(el, html`<new></new>`)
		patch: function patch(oldEl, newEl) {
				return oldEl.parentNode.replaceChild(newEl, oldEl);
		},
		html: function html(stringSet) {
				for (var _len = arguments.length, expressionSet = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
						expressionSet[_key - 1] = arguments[_key];
				}

				var template = document.createElement('template');
				template.innerHTML = stringSet.map(function (str, i) {
						return '' + str + (expressionSet[i] || '');
				}).join('');
				return template.content;
		},

		// dom ready
		docReady: function docReady(fn) {
				return document.readyState !== 'loading' ? fn() : document.addEventListener('DOMContentLoaded', fn);
		},

		// querySelectors
		queryAll: function queryAll(x) {
				var el = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
				return el.querySelectorAll(x);
		},
		queryFirst: function queryFirst(x) {
				var el = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
				return el.querySelector(x);
		},

		//String manips
		textToNumber: function textToNumber(x) {
				return parseFloat(x.substr(1).replace(/,/g, ''));
		},
		toTitleCase: function toTitleCase(str) {
				return str.toLowerCase().split(' ').map(function (x) {
						return '' + x[0].toUpperCase() + x.substring(1);
				}).join(' ');
		}
});

exports.default = helpers;

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var poNumberClick = function poNumberClick(_ref) {
    var helpers = _ref.helpers,
        columns = _ref.columns,
        email = _ref.email;
    var queryFirst = helpers.queryFirst,
        textToNumber = helpers.textToNumber;
    var dateCol = columns.dateCol,
        nameCol = columns.nameCol,
        poNumberCol = columns.poNumberCol,
        vendorCol = columns.vendorCol,
        descriptionCol = columns.descriptionCol,
        poTotalCol = columns.poTotalCol,
        totalPaidCol = columns.totalPaidCol;


    var dataTable = queryFirst('.data-table');
    var poNumberInputEl = queryFirst('.section-box input[name="PONumber"]');
    var poDigits = function poDigits(x) {
        return (x.match(/\d{8}/g) || [''])[0];
    };

    // copy on PO Number click
    dataTable && dataTable.addEventListener('click', function (e) {
        var el = e.target;
        if (el.classList.contains('btn-po-number')) {
            var text = el.innerHTML;
            var digits = poDigits(text);
            poNumberInputEl.value = digits;
            poNumberInputEl.select(); // select text
            document.execCommand('copy'); // copy text
        }
    });

    // generate email template on dbclick
    dataTable && dataTable.addEventListener('dblclick', function (event) {
        var el = event.target;

        if (el.classList.contains('btn-po-number')) {
            var row = el.parentNode;
            var date = queryFirst('td:nth-child(' + dateCol + ')', row).innerHTML;
            var name = queryFirst('td:nth-child(' + nameCol + ')', row).innerHTML.split(' ')[0];
            var poNumber = queryFirst('td:nth-child(' + poNumberCol + ')', row).innerHTML;
            var digits = poDigits(poNumber);
            var vendor = queryFirst('td:nth-child(' + vendorCol + ')', row).innerHTML;
            var description = queryFirst('td:nth-child(' + descriptionCol + ')', row).innerHTML;
            var poTotal = textToNumber(queryFirst('td:nth-child(' + poTotalCol + ')', row).innerHTML);
            var totalPaid = textToNumber(queryFirst('td:nth-child(' + totalPaidCol + ')', row).innerHTML);
            var textEl = document.createElement('textarea');

            textEl.id = 'poEmailTemplate';
            document.body.appendChild(textEl);

            var poEmailTemplate = document.getElementById('poEmailTemplate');
            poEmailTemplate.value = email({ digits: digits, name: name, poNumber: poNumber, date: date, vendor: vendor, description: description, poTotal: poTotal, totalPaid: totalPaid }, helpers);
            poEmailTemplate.select(); // select text
            document.execCommand('copy'); // copy text
            document.getElementById('poEmailTemplate').outerHTML = ''; // destroy element
            alert('Copied: ' + poNumber + ', $' + poTotal + ', ' + name);
        }
    });
};

exports.default = poNumberClick;

},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _templateObject = _taggedTemplateLiteral(['\n                ', '\n                <iframe src="https://ebuy.ucr.edu/ebuy/po_action.AttachDocument?nOrderID=', '"></iframe>\n            '], ['\n                ', '\n                <iframe src="https://ebuy.ucr.edu/ebuy/po_action.AttachDocument?nOrderID=', '"></iframe>\n            ']),
    _templateObject2 = _taggedTemplateLiteral(['\n                    <iframe style="', '" src="https://ebuy.ucr.edu/ebuy/po_action.MarkPartiallyOKtoPay?nOrderID=', '"></iframe>\n                    <iframe src="https://ebuy.ucr.edu/ebuy/po_view.ListAttachments?nOrderID=', '"></iframe>\n                '], ['\n                    <iframe style="', '" src="https://ebuy.ucr.edu/ebuy/po_action.MarkPartiallyOKtoPay?nOrderID=', '"></iframe>\n                    <iframe src="https://ebuy.ucr.edu/ebuy/po_view.ListAttachments?nOrderID=', '"></iframe>\n                ']),
    _templateObject3 = _taggedTemplateLiteral(['\n                    <iframe src="https://ebuy.ucr.edu/ebuy/po_receive.DisplayReceivePartial?nOrderID=', '"></iframe>\n                '], ['\n                    <iframe src="https://ebuy.ucr.edu/ebuy/po_receive.DisplayReceivePartial?nOrderID=', '"></iframe>\n                ']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

// if search and single PO and under costly price
var poSearch = function poSearch(_ref) {
    var helpers = _ref.helpers,
        rowElements = _ref.rowElements,
        presets = _ref.presets;
    var tablePrices = rowElements.tablePrices;
    var costlyPrice = presets.costlyPrice;
    var hasTextInURL = helpers.hasTextInURL,
        patch = helpers.patch,
        html = helpers.html,
        queryAll = helpers.queryAll,
        queryFirst = helpers.queryFirst;

    var firstRowPrice = function firstRowPrice() {
        return parseFloat(tablePrices[0].innerHTML.substr(1).replace(/,/g, ""));
    };
    var poActionLinks = function poActionLinks() {
        return queryAll('.data-table a[href*=\'po_action\']');
    }; // used to retrieve PO id

    if (hasTextInURL('po_search') && poActionLinks().length === 1) {

        // on form change, auto set filename and submit
        var listenOnFormInput = function listenOnFormInput(iframeWindow) {
            if (hasTextInURL('AttachDocument', iframeWindow)) {
                var doc = iframeWindow.document;
                var form = queryFirst('form[action*="po_attachments"]', doc);
                var filenameInputEl = queryFirst('input[name="sDescr"]', doc);
                var chooseFileInputEl = queryFirst('input[name="file"]', doc);

                // signal the uploader is ready
                chooseFileInputEl.classList.add('uploader');

                // on change name the file and submit
                chooseFileInputEl.onchange = function () {
                    var filenameText = chooseFileInputEl.value.split(/(\\|\/)/g).pop().split(".")[0];
                    filenameInputEl.value = filenameText; // set filename input
                    form.submit(); // auto submit the form
                };
            }
        };

        var searchId = poActionLinks()[0].href.split(/[=&]/)[1];

        var attachmentEl = document.createElement('attachment');
        var attachmentListEl = document.createElement('attachmentList');
        var receiveEl = document.createElement('receive');

        document.body.appendChild(attachmentEl);
        document.body.appendChild(attachmentListEl);
        document.body.appendChild(receiveEl);

        // declare ghost style for iframe (frame required to get ok to pay data)
        var ghostStyle = 'height:0;margin:0!important;padding:0!important;min-height:0!important;';

        // then patch the dom
        patch(queryFirst('attachment'), html(_templateObject, firstRowPrice() >= costlyPrice && '<div class="costly-warning">You are viewing a costly PO: $' + firstRowPrice() + '</div>', searchId));

        // delay is required to obtain the OrderID
        setTimeout(function () {
            patch(queryFirst('attachmentList'), html(_templateObject2, ghostStyle, searchId, searchId));
        }, 1000);

        setTimeout(function () {
            patch(queryFirst('receive'), html(_templateObject3, searchId));
        }, 2000);

        // then listen for form input on upload iframe
        setTimeout(function () {
            frames[0].window.eval(listenOnFormInput(frames[0].window));
        }, 5000);
    }
};

exports.default = poSearch;

},{}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var presets = Object.freeze({
    daysNew: 1,
    daysAged: 60,
    costlyPrice: 5000,
    percentRequiredTillPaid: 0.75
});

exports.default = presets;

},{}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _helpers = require('./helpers.js');

var _helpers2 = _interopRequireDefault(_helpers);

var _columns = require('./columns.js');

var _columns2 = _interopRequireDefault(_columns);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dateCol = _columns2.default.dateCol,
    poNumberCol = _columns2.default.poNumberCol,
    vendorCol = _columns2.default.vendorCol,
    descriptionCol = _columns2.default.descriptionCol,
    poTotalCol = _columns2.default.poTotalCol,
    totalPaidCol = _columns2.default.totalPaidCol;
var queryAll = _helpers2.default.queryAll;

// table column selector

var tableCol = function tableCol(x) {
    return '.data-table tr td:nth-child(' + x + ')';
};

var rowElements = Object.freeze({
    // element collections
    rows: queryAll('.data-table tr'),
    tableDates: queryAll(tableCol(dateCol)),
    tablePOs: queryAll(tableCol(poNumberCol)),
    tableVendors: queryAll(tableCol(vendorCol)),
    tableDescriptions: queryAll(tableCol(descriptionCol)),
    tablePrices: queryAll(tableCol(poTotalCol)),
    tablePayments: queryAll(tableCol(totalPaidCol))
});

exports.default = rowElements;

},{"./columns.js":4,"./helpers.js":7}]},{},[3]);
