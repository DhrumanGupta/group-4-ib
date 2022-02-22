const domain =
  (process.env.NODE_ENV || 'development') === 'development'
    ? 'http://localhost:1337'
    : 'https://domain.com'

const authKey = ''
const authBaseRoute = `${domain}/auth`
export const authRoutes = {
  getUser: `${authBaseRoute}/user`,
  register: `${authBaseRoute}/register`,
  login: `${authBaseRoute}/login`,
  logout: `${authBaseRoute}/logout`,
}

const warehouseBasePath = `${domain}/warehouse`
export const warehouseRoutes = {
  get: `${warehouseBasePath}`,
  create: `${warehouseBasePath}`,
}
