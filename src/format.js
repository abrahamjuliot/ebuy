const format = ({ readyToPay, reviewing, helpers, presets, rowElements }) => {
	const { hasTextInURL, patch, html, queryFirst, textToNumber } = helpers
	const { daysNew, daysAged, costlyPrice, percentRequiredTillPaid } = presets
	const { rows, tableDates, tablePOs, tableVendors, tableDescriptions, tablePrices, tablePayments } = rowElements
	const { travel, food } = readyToPay

	// banner counters
	let newPO = 0, paidPO = 0, agedPO = 0, costlyPO = 0 , ghostedPO = 0, reviewPO = 0, readyPO = 0
	const len = tablePrices.length // table length

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
		if (!ghosted(poNumber) 
			&& (listToRegExp(travel).test(poVendor)
			|| listToRegExp(travel).test(poDescription) 
			|| ((listToRegExp(food).test(poVendor)  // removed condition: amtPrice%1 !== 0
			|| listToRegExp(food).test(poDescription)))
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

	// create notification banner based on formatting totals
	if (hasTextInURL('po_search')) {
		const contentEl = queryFirst('.content')
		const bannerEl = document.createElement('banner')
		//insert banner element
		contentEl.insertBefore(bannerEl, contentEl.firstChild)
		// patch banner element
		patch(
			queryFirst('banner'),
			html`
			<span class="banner-${newPO?'new':'zero'}">${newPO || 0} new</span>
			<span class="banner-${paidPO?'paid':'zero'}">${paidPO || 0} paid</span>
			<span class="banner-${agedPO?'aged':'zero'}">${agedPO || 0} aged</span>
			<span class="banner-${costlyPO?'high':'zero'}">${costlyPO || 0} costly</span>
			<span class="banner-${ghostedPO?'ghost':'zero'}">${ghostedPO || 0} ghosted</span>
			<span class="banner-${reviewPO?'review':'zero'}">${reviewPO || 0} reviewed</span>
			<span class="banner-${readyPO?'ready':'zero'}">${readyPO || 0} ready</span>
			`
		)
	} 
}

export default format