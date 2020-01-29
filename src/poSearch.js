// if search and single PO and under costly price
const poSearch = ({ helpers, rowElements, presets }) => {
    const { tablePrices } = rowElements
    const { costlyPrice } = presets
    
    const { hasTextInURL, patch, html, queryAll, queryFirst } = helpers
    const firstRowPrice = () => parseFloat(tablePrices[0].innerHTML.substr(1).replace (/,/g, ""))
    const poActionLinks = () => queryAll(`.data-table a[href*='po_action']`) // used to retrieve PO id

    if (hasTextInURL('po_search') && poActionLinks().length === 1) {
        
        // on form change, auto set filename and submit
        const listenOnFormInput = (iframeWindow) => {
            if (hasTextInURL('AttachDocument', iframeWindow)) {
                const doc = iframeWindow.document
                const form = queryFirst('form[action*="po_attachments"]', doc)
                const filenameInputEl = queryFirst('input[name="sDescr"]', doc)
                const chooseFileInputEl = queryFirst('input[name="file"]', doc)
                
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

        const attachmentEl = document.createElement('attachment')
        const attachmentListEl = document.createElement('attachmentList')
        const receiveEl = document.createElement('receive')
        
        document.body.appendChild(attachmentEl)
        document.body.appendChild(attachmentListEl)
        document.body.appendChild(receiveEl)
        
        // declare ghost style for iframe (frame required to get ok to pay data)
        const ghostStyle = `height:0;margin:0!important;padding:0!important;min-height:0!important;`
        
        // then patch the dom
        patch(
            queryFirst('attachment'),
            html`
                ${firstRowPrice() >= costlyPrice && `<div class="costly-warning">You are viewing a costly PO: $${firstRowPrice()}</div>`}
                <iframe src="https://ebuy.ucr.edu/ebuy/po_action.AttachDocument?nOrderID=${searchId}"></iframe>
            `
        )
        
        // delay is required to obtain the OrderID
        setTimeout(() => {
            patch(
                queryFirst('attachmentList'),
                html`
                    <iframe style="${ghostStyle}" src="https://ebuy.ucr.edu/ebuy/po_action.MarkPartiallyOKtoPay?nOrderID=${searchId}"></iframe>
                    <iframe src="https://ebuy.ucr.edu/ebuy/po_view.ListAttachments?nOrderID=${searchId}"></iframe>
                `
            )
        }, 700)

        setTimeout(() => {
            patch(
                queryFirst('receive'),
                html`
                    <iframe src="https://ebuy.ucr.edu/ebuy/po_receive.DisplayReceivePartial?nOrderID=${searchId}"></iframe>
                `
            )
        }, 1400)

        // then listen for form input on upload iframe
        setTimeout(() => {
            frames[0].window.eval(listenOnFormInput(frames[0].window))
        }, 5000)
    }

}

export default poSearch