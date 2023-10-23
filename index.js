addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  // Check if the user is authenticated
  const userInfo = await fetchUserInfo(request);

  // If the user is not authenticated, return a 403 Forbidden response
  if (!userInfo) {
    return new Response('Forbidden', { status: 403 });
  }

  // Construct the HTML response
  const responseHTML = `
    <html>
      <body>
        <p>${userInfo.EMAIL} authenticated at ${userInfo.TIMESTAMP} from <a href="/secure/${userInfo.COUNTRY}">${userInfo.COUNTRY}</a></p>
        <img src="https://pub-b4c3fca4cbe745b0973cebb2867d32e1.r2.dev/${userInfo.COUNTRY}.png" alt="${userInfo.COUNTRY} Flag">
      </body>
    </html>
  `;

  return new Response(responseHTML, {
    headers: {
      'Content-Type': 'text/html',
    },
  });
}

async function fetchUserInfo(request) {
  // Implement the logic to fetch user information.
  // You may need to use the Cloudflare API or some other mechanism to get user data.
  // For example, you could fetch user data from your own database or an identity provider.

  // Replace the following with your own implementation
  // Here, we will simulate fetching user information from a database or external source.
  const userGoogleIdP = '142538743499-vuqncebr44c9lsb0qr7mkf5mdt2sudc3.apps.googleusercontent.com';
  const userEmail = 'josenirranjanc@gmail.com';

  // Simulate fetching the user's country code (replace with actual logic to fetch it)
  let userCountry = await fetchCountryCode(request);

  // Check if the user is yourself (Google IdP SSO) or has an @cloudflare.com email address.
  if (userGoogleIdP === '142538743499-vuqncebr44c9lsb0qr7mkf5mdt2sudc3.apps.googleusercontent.com' || userEmail.endsWith('@cloudflare.com')) {
    // If the user is authenticated, set the country code.
    if (userGoogleIdP === '142538743499-vuqncebr44c9lsb0qr7mkf5mdt2sudc3.apps.googleusercontent.com') {
      // Set the country code for yourself (replace with your actual country code)
      userCountry = 'canada';
    } else if (userEmail.endsWith('@cloudflare.com')) {
      // Set the country code for @cloudflare.com users (replace with your actual country code)
      userCountry = 'cloudflare_country_code';
    }

    const userInfo = {
      EMAIL: userEmail,
      TIMESTAMP: new Date().toLocaleString(),
      COUNTRY: userCountry,
      googleIdPSso: userGoogleIdP,
      email: userEmail,
    };

    return userInfo;
  }

  return null; // Return null if the user is not authenticated
}

async function fetchCountryCode(request) {
  // Implement the logic to fetch the user's country code.
  // This can involve making a request to an external service or using other methods to determine the country code.
  // Replace the following with your own implementation.

  // Simulate fetching the country code (replace with actual logic)
  return 'user_country_code';
}

