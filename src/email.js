import { toTitleCase } from './helpers.js'

const email = ({ digits, name, poNumber, date, vendor, description, poTotal, totalPaid }) => 
`Status of PO ${digits}
Hi ${name}, are all items in this PO received?

PO: ${poNumber}
PO Date: ${date}
Vendor: ${toTitleCase(vendor)}
Description: ${description}
Total: $${poTotal}
Total Paid (by Accounting): $${totalPaid?totalPaid:0}

Abraham
`

export default email