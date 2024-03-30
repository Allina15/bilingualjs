import DeleteResults from '../../../components/user/results/DeleteResults'
import DataOfSubmission from '../../../components/user/results/DataOfSubmission'
import { resultsStatusHandler } from '../../helpers'

const COLUMNS = [
   {
      Header: '#',
      accessor: 'id',

      Cell: ({ row }) => row.index + 1,
   },

   {
      Header: 'Date of Submition',
      accessor: 'dateOfSubmission',

      Cell: ({ row }) => <DataOfSubmission row={row} />,
   },

   {
      Header: 'Test name',
      accessor: 'testName',
   },

   {
      Header: 'Status',
      accessor: 'resultStatus',

      Cell: ({ row }) => resultsStatusHandler(row.original.resultStatus),
   },

   {
      Header: 'Score',
      accessor: 'score',
   },

   {
      Header: ' ',
      accessor: 'action',

      Cell: ({ row }) => <DeleteResults row={row} />,
   },
]

export { COLUMNS }
