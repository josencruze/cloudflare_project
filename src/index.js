addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const { email, country } = getAuthInfo(request)

  if (!email) {
    return new Response('Not authenticated', { status: 401 })
  }

  const timestamp = new Date().toUTCString()
  const countryFlagURL = `https://www.countryflags.com/${country}.png`

  const htmlResponse = `
    <html>
      <body>
        <p>${email} authenticated at ${timestamp} from <a href="/secure/${country}">${country}</a></p>
        <img src="${countryFlagURL}" alt="${country} Flag">
      </body>
    </html>
  `

  return new Response(htmlResponse, {
    headers: { 'Content-Type': 'text/html' },
  })
}

function getAuthInfo(request) {
  // Implement your authentication logic here to get user information.
  // You can access the user's email and country based on your authentication mechanism.
  // For demonstration purposes, we're assuming you have a custom header.
  const email = request.headers.get('X-User-Email')
  const country = request.headers.get('X-User-Country')
  return { email, country }
}

