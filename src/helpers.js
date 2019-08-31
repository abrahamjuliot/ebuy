const helpers = Object.freeze(
    {
		// url checker
		hasTextInURL: (x, w = window) => (new RegExp(x, 'gi')).test(w.location.href),

		// 6 line JSX alternative, patch(el, html`<new></new>`)
		patch: (oldEl, newEl) => oldEl.parentNode.replaceChild(newEl, oldEl),
		html: (stringSet,...expressionSet) => {
		const template = document.createElement('template')
		template.innerHTML = stringSet.map((str, i) => `${str}${expressionSet[i]||''}`).join('')
		return template.content
		},

		// dom ready
		docReady: (fn) => 
			document.readyState !== 'loading'?
			fn(): document.addEventListener('DOMContentLoaded', fn),

		// querySelectors
		queryAll: (x, el = document) => el.querySelectorAll(x),
		queryFirst: (x, el = document) => el.querySelector(x),

		//String manips
		textToNumber: (x) => parseFloat(x.substr(1).replace(/,/g, '')),
		toTitleCase: (str) => str
			.toLowerCase()
			.split(' ')
			.map(x => `${x[0].toUpperCase()}${x.substring(1)}`)
			.join(' ')
	}
) 

export default helpers