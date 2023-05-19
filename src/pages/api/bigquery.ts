// // eslint-disable-next-line @typescript-eslint/no-var-requires
// const { BigQuery } = require('@google-cloud/bigquery')
// const projectId = 'capable-shape-86811'

// const bigqueryClient = new BigQuery({
//   projectId,
//   keyFilename: './gcloud_creds.json',
// })

// export default async function queryStackOverflow(req, res) {
//   const sqlQuery = `SELECT * FROM \`capable-shape-86811.storeleadstest.ecommerce_leads_with_geo_test\` LIMIT 10`

//   const options = {
//     query: sqlQuery,
//   }

//   const [rows] = await bigqueryClient.query(options)

//   console.log('Query Results:')
//   rows.forEach((row) => {
//     console.log(`row: ${row}`)
//   })
//   res.json(rows)
// }
