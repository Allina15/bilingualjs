import { memo, useMemo } from 'react'
import { useTable } from 'react-table'
import {
   styled,
   TableBody,
   TableCell,
   TableContainer,
   TableHead,
   TableRow,
   Table as MuiTable,
   Skeleton,
} from '@mui/material'

const Table = ({ columns: headers, data, isLoading }) => {
   const columns = useMemo(() => headers, [])

   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
      useTable({
         columns,
         data,
      })

   return (
      <StyledTableContainer>
         <StyledTable {...getTableProps()}>
            {isLoading ? (
               <Skeleton
                  variant="rounded"
                  width={933}
                  height={25}
                  className="skeleton-box"
               />
            ) : (
               <TableHead>
                  {headerGroups?.map((headerGroup, i) => (
                     <TableRow
                        {...headerGroup.getHeaderGroupProps()}
                        key={headerGroup.headers[i].Header}
                     >
                        {headerGroup.headers?.map((column) => (
                           <StyledCellTh
                              {...column.getHeaderProps({
                                 style: { ...column.style },
                              })}
                              key={column.id}
                           >
                              {column.render('Header')}
                           </StyledCellTh>
                        ))}
                     </TableRow>
                  ))}
               </TableHead>
            )}

            <TableBody {...getTableBodyProps()}>
               {rows?.map((row) => {
                  prepareRow(row)
                  return isLoading ? (
                     <Skeleton
                        key={row.id}
                        variant="rounded"
                        width={933}
                        height={66}
                        className="skeleton-box"
                     />
                  ) : (
                     <StyledCellTr
                        {...row.getRowProps()}
                        key={row.id}
                        index={row.index}
                     >
                        {row.cells?.map((cell) => (
                           <StyledCellTd
                              {...cell.getCellProps({
                                 style: { ...cell.column.style },
                              })}
                              key={cell.column.id}
                              row={row}
                           >
                              {cell.column.id === 'resultStatus' ||
                              cell.column.id === 'score' ||
                              cell.column.id === 'status' ? (
                                 <span>{cell.render('Cell')}</span>
                              ) : (
                                 cell.render('Cell')
                              )}
                           </StyledCellTd>
                        ))}
                     </StyledCellTr>
                  )
               })}
            </TableBody>
         </StyledTable>
      </StyledTableContainer>
   )
}

export default memo(Table)

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   justifyContent: 'center',
   padding: '3.13rem 6.13rem',
   margin: '5rem auto',
   width: '70.625rem',
   backgroundColor: theme.palette.primary.white,
   borderRadius: '20px',
   filter: 'drop-shadow(0px 4px 39px rgba(196, 196, 196, 0.60))',

   [theme.breakpoints.down('lg')]: {
      width: '60rem',
      padding: '1.13rem 3.13rem',
   },

   '& .skeleton-box': {
      marginBottom: '0.87rem',
      borderRadius: '8px',
      backgroundColor: '#e5e5e567',
   },
}))

const StyledTable = styled(MuiTable)(() => ({
   borderSpacing: '0 0.87rem',
   borderCollapse: 'separate',
}))

const StyledCellTr = styled(TableRow)(() => ({
   borderRadius: '0.7rem',
   boxShadow:
      '0px 4px 10px 0px rgba(0, 0, 0, 0.06), 0px -4px 10px 0px rgba(0, 0, 0, 0.06)',
}))

const StyledCellTd = styled(TableCell)(({ row }) => ({
   height: '4.125rem',
   color: ' #4C4859',
   borderBottom: 'none',
   textAlign: 'left',
   fontFamily: 'Poppins',

   '& > button > .evaluated > path': {
      stroke: '#2AB930',
   },

   '& > span': {
      fontFamily: 'inherit',
      color:
         row.original.status === 'EVALUATED' ||
         row.original.resultStatus === 'EVALUATED'
            ? '#2AB930'
            : '#F61414',
   },
}))

const StyledCellTh = styled(TableCell)(() => ({
   fontWeight: '600',
   borderBottom: 'none',
   textAlign: 'left',
}))
