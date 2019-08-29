import helpers from './helpers.js'
import columns from './columns.js'

const { dateCol, poNumberCol, vendorCol, descriptionCol, poTotalCol, totalPaidCol } = columns
const { queryAll } = helpers
const rowElements = {}

// table column selector
const tableCol = (x) => `.data-table tr td:nth-child(${x})`

// element collections
rowElements.rows = queryAll(`.data-table tr`)
rowElements.tableDates = queryAll(tableCol(dateCol))
rowElements.tablePOs = queryAll(tableCol(poNumberCol))
rowElements.tableVendors = queryAll(tableCol(vendorCol))
rowElements.tableDescriptions = queryAll(tableCol(descriptionCol))
rowElements.tablePrices = queryAll(tableCol(poTotalCol))
rowElements.tablePayments = queryAll(tableCol(totalPaidCol))


export default rowElements