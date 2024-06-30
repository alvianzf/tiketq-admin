const BASE_URL = import.meta.env.VITE_BASE_URL

export class API {
  static login() {
    return `${BASE_URL}/api/auth`
  }
}
