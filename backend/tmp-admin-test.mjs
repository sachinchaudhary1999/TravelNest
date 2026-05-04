import dotenv from 'dotenv'

dotenv.config()
const serverUrl = 'http://localhost:8000'

const loginRes = await fetch(`${serverUrl}/api/auth/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASSWORD }),
  redirect: 'manual',
})
const loginData = await loginRes.json().catch(() => null)
console.log('login status', loginRes.status, loginData?.message || 'ok')
const setCookie = loginRes.headers.get('set-cookie')
console.log('set-cookie header', setCookie)
const cookie = setCookie ? setCookie.split(';')[0] : ''

const adminRes = await fetch(`${serverUrl}/api/admin/listings?limit=5`, {
  method: 'GET',
  headers: cookie ? { Cookie: cookie } : undefined,
})
const adminData = await adminRes.json().catch(() => null)
console.log('admin listings status', adminRes.status)
console.log(adminData)
