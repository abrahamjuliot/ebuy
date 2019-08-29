const helpers = {}

// url checker
helpers.hasTextInURL = (x, w = window) => (new RegExp(x, 'gi')).test(w.location.href)

// 6 line JSX alternative, patch(el, html`<new></new>`)
helpers.patch = (oldEl, newEl) => oldEl.parentNode.replaceChild(newEl, oldEl)
helpers.html = (stringSet,...expressionSet) => {
  const template = document.createElement('template')
  template.innerHTML = stringSet.map((str, i) => `${str}${expressionSet[i]||''}`).join('')
  return template.content
}

// dom ready
helpers.docReady = (fn) => 
	document.readyState !== 'loading'?
	fn(): document.addEventListener('DOMContentLoaded', fn)

// querySelectors
helpers.queryAll = (x, el = document) => el.querySelectorAll(x)
helpers.queryFirst = (x, el = document) => el.querySelector(x)

//String manips
helpers.textToNumber = (x) => parseFloat(x.substr(1).replace(/,/g, ''))
helpers.toTitleCase = (str) => str
	.toLowerCase()
	.split(' ')
	.map(x => `${x[0].toUpperCase()}${x.substring(1)}`)
    .join(' ')   

export default helpers