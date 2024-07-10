const BASE_URL = import.meta.env.VITE_BASE_URL

export class API {
  static login() {
    return `${BASE_URL}/api/auth`
  }

  static listBookings() {
    return `${BASE_URL}/api/booking-data`
  }

  static issueBooking() {
    return `${BASE_URL}/api/payment`
  }

  static cekIssued(bookingCode) {
    return `${BASE_URL}/api/book-info/${bookingCode}`
  }
}
