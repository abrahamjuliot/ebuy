/*eslint-disable semi */
!function(){

// url checker
const hasTextInURL = (x, w = window) => (new RegExp(x, 'gi')).test(w.location.href)

// check before dom loads
if (hasTextInURL('po_receive') || hasTextInURL('DisplayPrintOptions')) {
	const listenForPopUp = setInterval(() => {
		let closed = false
		if (!closed && (hasTextInURL('po_receive') || hasTextInURL('DisplayPrintOptions'))) {
			closed = true
			window.close()
			clearInterval(listenForPopUp)
		}
	}, 100)
}


// 6 line JSX alternative, patch(el, html`<new></new>`)
const patch = (oldEl, newEl) => oldEl.parentNode.replaceChild(newEl, oldEl)
const html = (stringSet,...expressionSet) => {
  const template = document.createElement('template')
  template.innerHTML = stringSet.map((str, i) => `${str}${expressionSet[i]||''}`).join('')
  return template.content
}
// dom ready
const docReady = (fn) => 
	document.readyState !== 'loading'?
	fn(): document.addEventListener('DOMContentLoaded', fn)
// querySelectorAll
const queryAll = (x) => document.querySelectorAll(x)

//String manips
const textToNumber = (x) => parseFloat(x.substr(1).replace(/,/g, ''))
const toTitleCase = (str) => str
	.toLowerCase()
	.split(' ')
	.map(x => `${x[0].toUpperCase()}${x.substring(1)}`)
	.join(' ')

// data
const readyToPay = `
	flight bank sub getaway stater pizza mission barnes 
	smart cafe photoshop bbq starbucks restaurant suites
	inn hospitality coffee tea gra-pow shuttle intermediate
	thai lodging lunch restaurants publication llamas
`
		
const reviewing = `
	10890351
	10928190
	10936095
	10939286
	10946741
	10951937
	10954269
	10955047
	10957634
	10958450
	10958934
	10960062
	10960342
	10961291
	10961732
	10962348
	10963183
	10963352
	10964802
	10964982
	10965054
	10966165
	10976510
	10971943
	10971321
	10971025
	10970473	
`

docReady(function(){
	// presets
	const searchMode = false
	const daysNew = 1
	const daysAged = 60
	const costlyPrice = 5000
	const percentRequiredTillPaid = 0.75
	
	// banner counters
	let newPO = 0, paidPO = 0, agedPO = 0, 
	costlyPO = 0 , ghostedPO = 0, reviewPO = 0, readyPO = 0
	
	// column presets
    const dateCol = 2
	const poNumberCol = 4
	const vendorCol = 5
	const descriptionCol = 6
	const poTotalCol = 8
	const totalPaidCol = 9
	
	// table column selector
	const tableCol = (x) => `.data-table tr td:nth-child(${x})`
	
	// element collections
	const rows = queryAll(`.data-table tr`)
	const tableDates = queryAll(tableCol(dateCol))
	const tablePOs = queryAll(tableCol(poNumberCol))
	const tableVendors = queryAll(tableCol(vendorCol))
	const tableDescriptions = queryAll(tableCol(descriptionCol))
	const tablePrices = queryAll(tableCol(poTotalCol))
	const tablePayments = queryAll(tableCol(totalPaidCol))
	
	// table length
    const len = tablePrices.length
    
	// row conditional formatting
	for (let i = 0; i < len; i++) {
		const thisRow = rows[i+1]
		const poPriceEl = tablePrices[i]
		const poPaidEl = tablePayments[i]
		const amtPrice = textToNumber(poPriceEl.innerHTML)
		const amtPaid = textToNumber(poPaidEl.innerHTML)
		
		const poVendor = tableVendors[i].innerHTML.toLowerCase()
		const poDescription = tableDescriptions[i].innerHTML.toLowerCase()
		const poNumber = tablePOs[i].innerHTML
		const poDate = tableDates[i].innerHTML

		tablePOs[i].classList.add('btn-po-number')

		// ghost POs
		const ghosted = (x) => /O[WV]|NU/.test(x)

		if (ghosted(poNumber)) {
			thisRow.classList.add('ghost'); ghostedPO++
		}
		
		// costly, bkm and paid POs
		if (!ghosted(poNumber) && amtPrice >= costlyPrice) {
			poPriceEl.classList.add('highlight-costly'); costlyPO++

			// bkm
			if ((new RegExp('bkm|wmk', 'gi')).test(poVendor)) {
				thisRow.classList.add('highlight-bkm');
			}
		} else if (amtPaid >= (amtPrice*percentRequiredTillPaid)) {
			poPriceEl.classList.add('highlight-paid')
			poPaidEl.classList.add('highlight-paid'); paidPO++
		}
		
		// ready to receive and in review POs
		const templateToList = (str) =>
			str.replace(/\t|\n/gm, ' ').split(' ').filter(x => x) 
		const listToRegExp = (list) => (new RegExp(templateToList(list).join('|'), 'gi'))
		
		// if not ghosted and ready to pay or zero price
		if (!ghosted(poNumber) && (listToRegExp(readyToPay).test(poVendor)
			|| listToRegExp(readyToPay).test(poDescription) 
			|| amtPrice === 0)) {
			thisRow.classList.add('ready'); readyPO++
		}
		
		if (listToRegExp(reviewing).test(poNumber)) {
			thisRow.classList.add('reviewing'); reviewPO++
		}
		
		// aged POs
		const numericDate = (d) => Math.floor(d.getTime() / (3600*24*1000))
			
		if (!ghosted(poNumber) && (numericDate(new Date()) - numericDate(new Date(poDate))) >= daysAged) {
			thisRow.classList.add('outdated'); agedPO++
		}
		
		// new POs
		if (!ghosted(poNumber) && (numericDate(new Date()) - numericDate(new Date(poDate))) <= daysNew) {
			thisRow.classList.add('new-this-week'); newPO++
		}
	}
	
	// search on PO Number click
	const dataTable = document.querySelector('.data-table')
	const poNumberInputEl = document.querySelector('.section-box input[name="PONumber"]')
	const searchInputEl = document.querySelector('.section-box input[value="Search"] ')
    const poDigits = (x) => (x.match(/\d{8}/g) || [''])[0]
    
	dataTable && dataTable.addEventListener('click', e => {
		const el = e.target
		if (el.classList.contains('btn-po-number')) {
			const text = el.innerHTML
			const digits = poDigits(text)
			poNumberInputEl.value = digits
			poNumberInputEl.select() // select text
            document.execCommand('copy') // copy text
            
			searchMode && searchInputEl.click()
		}
    })
    
    dataTable && dataTable.addEventListener('dblclick', event => {
		const el = event.target
		if (el.classList.contains('btn-po-number')) {
            const row = el.parentNode
            const date = row.querySelector('td:nth-child(2)').innerHTML
            const name = row.querySelector('td:nth-child(3)').innerHTML.split(' ')[0]
            const poNumber = row.querySelector('td:nth-child(4)').innerHTML
            const digits = poDigits(poNumber)
            const vendor = row.querySelector('td:nth-child(5)').innerHTML
            const description = row.querySelector('td:nth-child(6)').innerHTML
            const poTotal = textToNumber(row.querySelector('td:nth-child(8)').innerHTML)
            const totalPaid = textToNumber(row.querySelector('td:nth-child(9)').innerHTML)
            const textEl = document.createElement('textarea')
            textEl.id = 'poEmailTemplate'
            document.body.appendChild(textEl)
            
            const poEmailTemplate = document.getElementById('poEmailTemplate')
            poEmailTemplate.value = `Status of PO ${digits}
Hi ${name}, are all items in this PO received?

PO: ${poNumber}
PO Date: ${date}
Vendor: ${toTitleCase(vendor)}
Description: ${description}
Total: $${poTotal}
Total Paid (by Accounting): $${totalPaid?totalPaid:0}

Abraham
`
            poEmailTemplate.select() // select text
            document.execCommand('copy') // copy text
            document.getElementById('poEmailTemplate').outerHTML = '' // destroy element
			alert(`Copied: ${poNumber}, $${poTotal}, ${name}`)
		}
    })
    
	// create notification banner
	if (hasTextInURL('po_search')) {
		const contentEl = document.querySelector('.content')
		const bannerEl = document.createElement('banner')
		//insert banner element
		contentEl.insertBefore(bannerEl, contentEl.firstChild)
		// patch banner element
		patch(
		  document.querySelector('banner'),
		  html`
			<span class="banner-${newPO?'new':'zero'}">${newPO} new</span>
			<span class="banner-${paidPO?'paid':'zero'}">${paidPO} paid</span>
			<span class="banner-${agedPO?'aged':'zero'}">${agedPO} aged</span>
			<span class="banner-${costlyPO?'high':'zero'}">${costlyPO} costly</span>
			<span class="banner-${ghostedPO?'ghost':'zero'}">${ghostedPO} ghosted</span>
			<span class="banner-${reviewPO?'review':'zero'}">${reviewPO} reviewed</span>
			<span class="banner-${readyPO?'ready':'zero'}">${readyPO} ready</span>
		  `
		)
	} 
	
	// if search and single PO and under costly price
	const firstRowPrice = () => parseFloat(tablePrices[0].innerHTML.substr(1).replace (/,/g, ""))
	const poActionLinks = () => queryAll(`.data-table a[href*='po_action']`)
	
	if (hasTextInURL('po_search') && poActionLinks().length === 1) {
		
		// on form change, auto set filename and submit
		const listenOnFormInput = (iframeWindow) => {
			if (hasTextInURL('AttachDocument', iframeWindow)) {
				const doc = iframeWindow.document
				const form = doc.querySelector('form[action*="po_attachments"]')
				const filenameInputEl = doc.querySelector('input[name="sDescr"]')
				const chooseFileInputEl = doc.querySelector('input[name="file"]')
				
				// signal the uploader is ready
				chooseFileInputEl.classList.add('uploader')
				
				// on change name the file and submit
				chooseFileInputEl.onchange = () => {
					const filenameText = chooseFileInputEl.value.split(/(\\|\/)/g).pop().split(".")[0]
					filenameInputEl.value = filenameText // set filename input
					form.submit() // auto submit the form
				}
			}
		}

		const searchId = poActionLinks()[0].href.split(/[=&]/)[1]
		const receiveEl = document.createElement('receive')
		
		document.body.appendChild(receiveEl)
        
        // declare ghost style for iframe (frame required to get ok to pay data)
        const ghostStyle = `height:0;margin:0!important;padding:0!important;min-height:0!important;`
		// then patch the dom
		patch(
			document.querySelector('receive'),
			html`
				${firstRowPrice() >= costlyPrice && `<div class="costly-warning">You are viewing a costly PO: $${costlyPrice}</div>`}
                <iframe src="https://ebuy.ucr.edu/ebuy/po_action.AttachDocument?nOrderID=${searchId}"></iframe>
                <iframe style="${ghostStyle}" src="https://ebuy.ucr.edu/ebuy/po_action.MarkPartiallyOKtoPay?nOrderID=${searchId}"></iframe>
				<iframe src="https://ebuy.ucr.edu/ebuy/po_view.ListAttachments?nOrderID=${searchId}"></iframe>
				<iframe src="https://ebuy.ucr.edu/ebuy/po_receive.DisplayReceivePartial?nOrderID=${searchId}"></iframe>
		  `
		)
		
		// then listen for form input on upload iframe
		setTimeout(() => {
			frames[0].window.eval(listenOnFormInput(frames[0].window))
		}, 5000)
	}

}) // end docReady

}()//end IIF closure