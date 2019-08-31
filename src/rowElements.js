import helpers from './helpers.js'
import columns from './columns.js'

const { dateCol, poNumberCol, vendorCol, descriptionCol, poTotalCol, totalPaidCol } = columns
const { queryAll } = helpers

// table column selector
const tableCol = (x) => `.data-table tr td:nth-child(${x})`

const rowElements = Object.freeze(
    {
        // element collections
        rows: queryAll(`.data-table tr`),
        tableDates: queryAll(tableCol(dateCol)),
        tablePOs: queryAll(tableCol(poNumberCol)),
        tableVendors: queryAll(tableCol(vendorCol)),
        tableDescriptions: queryAll(tableCol(descriptionCol)),
        tablePrices: queryAll(tableCol(poTotalCol)),
        tablePayments: queryAll(tableCol(totalPaidCol))
    }
)

export default rowElements