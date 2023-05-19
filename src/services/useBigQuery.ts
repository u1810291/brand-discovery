// import { BigQuery } from '@google-cloud/bigquery'
// import { useCallback, useState } from 'react'
// const projectId = 'capable-shape-86811'

// const bigqueryClient = new BigQuery({
//   projectId,
//   keyFilename: '../../gcloud_creds.json',
// })

// export function useGetBigQueryData() {
//   const [data, setData] = useState<any>()
//   const bigQueryGetData = useCallback(async () => {
//     const sqlQuery = `SELECT * FROM \`capable-shape-86811.storeleadstest.ecommerce_leads_with_geo_test\` LIMIT 10`
//     const options = {
//       query: sqlQuery,
//     }
//     const [rows] = await bigqueryClient.query(options)
//     console.log('Query Results:')
//     rows.forEach((row) => {
//       console.log(`row: ${row}`)
//     })
//     setData(rows)
//   }, [])
//   return [data, bigQueryGetData]
// }
