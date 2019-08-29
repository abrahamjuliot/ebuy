// app helpers
import helpers from './helpers.js'

// app data
import readyToPay from '../data/readyToPay.js'
import reviewing from '../data/reviewing.js'

// app settings
import presets from './presets.js'
import rowElements from './rowElements.js'
import columns from './columns.js'

// app functions
import format from './format.js'
import poNumberClick from './poNumberClick.js'
import poSearch from './poSearch.js'

const { hasTextInURL, docReady } = helpers

// check before doc ready
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

// when dom is ready
docReady(() => {

    format({ readyToPay, reviewing, helpers, presets, rowElements })
    
    poNumberClick({ helpers, columns })
    
    poSearch({ helpers, rowElements, presets })

})