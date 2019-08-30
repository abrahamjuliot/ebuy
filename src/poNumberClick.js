const poNumberClick = ({ helpers, columns, email }) => {
    
    const { queryFirst, textToNumber } = helpers
    const { dateCol, nameCol, poNumberCol, vendorCol, descriptionCol, poTotalCol, totalPaidCol } = columns

    const dataTable = queryFirst('.data-table')
    const poNumberInputEl = queryFirst('.section-box input[name="PONumber"]')
    const poDigits = (x) => (x.match(/\d{8}/g) || [''])[0]

    // copy on PO Number click
    dataTable && dataTable.addEventListener('click', e => {
        const el = e.target
        if (el.classList.contains('btn-po-number')) {
            const text = el.innerHTML
            const digits = poDigits(text)
            poNumberInputEl.value = digits
            poNumberInputEl.select() // select text
            document.execCommand('copy') // copy text
        }
    })

    // generate email template on dbclick
    dataTable && dataTable.addEventListener('dblclick', event => {
        const el = event.target

        if (el.classList.contains('btn-po-number')) {
            const row = el.parentNode
            const date = queryFirst(`td:nth-child(${dateCol})`, row).innerHTML
            const name = queryFirst(`td:nth-child(${nameCol})`, row).innerHTML.split(' ')[0]
            const poNumber = queryFirst(`td:nth-child(${poNumberCol})`, row).innerHTML
            const digits = poDigits(poNumber)
            const vendor = queryFirst(`td:nth-child(${vendorCol})`, row).innerHTML
            const description = queryFirst(`td:nth-child(${descriptionCol})`, row).innerHTML
            const poTotal = textToNumber(queryFirst(`td:nth-child(${poTotalCol})`, row).innerHTML)
            const totalPaid = textToNumber(queryFirst(`td:nth-child(${totalPaidCol})`, row).innerHTML)
            const textEl = document.createElement('textarea')
            
            textEl.id = 'poEmailTemplate'
            document.body.appendChild(textEl)
            
            const poEmailTemplate = document.getElementById('poEmailTemplate')
            poEmailTemplate.value = email({digits, name, poNumber, date, vendor, description, poTotal, totalPaid}, helpers)
            poEmailTemplate.select() // select text
            document.execCommand('copy') // copy text
            document.getElementById('poEmailTemplate').outerHTML = '' // destroy element
            alert(`Copied: ${poNumber}, $${poTotal}, ${name}`)
        }
    })

}


export default poNumberClick