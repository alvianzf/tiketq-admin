/* eslint-disable react/jsx-key */
import React, { useContext, useEffect, useState } from 'react'
import {
  CCard,
  CCardHeader,
  CCardBody,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
} from '@coreui/react'
import { BookingContext } from '../../../context/Booking/BookingContext'
import { useTable, usePagination, useGlobalFilter } from 'react-table'
import { checkTicket, getIssued } from '../../../services/book-data/bookDataService'
import { Toast } from '@coreui/coreui'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const BookData = () => {
  const { bookData } = useContext(BookingContext)
  const [search, setSearch] = useState('')
  const [bookingData, setBookingData] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'Daftar Booking'

    if (Array.isArray(bookData)) {
      setBookingData(bookData)
    }
  }, [bookData])

  const columns = React.useMemo(
    () => [
      { Header: 'Nama', accessor: 'name' },
      { Header: 'Booking No', accessor: 'bookingCode' },
      { Header: 'Nominal', accessor: 'nominal' },
      { Header: 'Dari', accessor: 'origin' },
      { Header: 'Ke', accessor: 'destination' },
      { Header: 'Tanggal Keberangkatan', accessor: 'departureDate' },
    ],
    [],
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    setGlobalFilter,
    prepareRow,
  } = useTable(
    {
      columns,
      data: bookingData,
      initialState: { pageIndex: 0, pageSize: 5 },
    },
    useGlobalFilter,
    usePagination,
  )

  const { pageIndex, globalFilter } = state

  useEffect(() => {
    setGlobalFilter(search)
  }, [search, setGlobalFilter])

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    const date = new Date(dateString)
    return date.toLocaleDateString('en-GB', options)
  }

  const handleIssued = async (bookingCode, nominal) => {
    try {
      const issue = await getIssued(bookingCode, nominal)

      return issue
    } catch (err) {
      console.log(err)
      toast.error(err)
    }
  }

  const handleCheck = async (bookingCode) => {
    try {
      const result = await checkTicket(bookingCode)

      if (result.rc == '00') {
        toast.success('Dana telah diteruskan')
      }
      if (result.rc == '32') {
        toast.warning('Dana masih ditahan sementara')
      }

      console.log(result.rc)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>Data Booking</CCardHeader>
        <CCardBody>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-3"
          />
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Tanggal Berangkat</CTableHeaderCell>
                <CTableHeaderCell scope="col">Nama</CTableHeaderCell>
                <CTableHeaderCell scope="col">Nominal</CTableHeaderCell>
                <CTableHeaderCell scope="col" colSpan={1}>
                  Tanggal Booking
                </CTableHeaderCell>
                <CTableHeaderCell scope="col">Dari</CTableHeaderCell>
                <CTableHeaderCell scope="col">Tujuan</CTableHeaderCell>
                <CTableHeaderCell scope="col">Opsi</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {bookData.data.map((item, i) => (
                <CTableRow key={i}>
                  <CTableDataCell scope="col">{i + 1}</CTableDataCell>
                  <CTableDataCell scope="col">{item.departureDate}</CTableDataCell>
                  <CTableDataCell scope="col">{item.name}</CTableDataCell>
                  <CTableDataCell scope="col">{item.nominal}</CTableDataCell>
                  <CTableDataCell scope="col" colSpan={1}>
                    {formatDate(item.book_date)}
                  </CTableDataCell>
                  <CTableDataCell scope="col">{item.origin}</CTableDataCell>
                  <CTableDataCell scope="col">{item.destination}</CTableDataCell>
                  <CTableDataCell scope="col">
                    <CButton
                      color="primary"
                      onClick={() => handleIssued(item.bookingCode, item.nominal)}
                    >
                      Issue
                    </CButton>
                    <a
                      href={`https://tiketq.com/eticket?bookingno=${item.bookingCode}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <CButton color="warning" onClick={() => handleCheck(item.bookingCode)}>
                        Cek
                      </CButton>
                    </a>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
          <div className="pagination">
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
              Previous
            </button>
            <span>
              Page{' '}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{' '}
            </span>
            <button onClick={() => nextPage()} disabled={!canNextPage}>
              Next
            </button>
          </div>
        </CCardBody>
      </CCard>
    </>
  )
}

export default BookData
