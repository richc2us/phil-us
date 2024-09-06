// {
//   debug: 'debug',
//   code: 'CREATE_STATE',
//   metadata: { value: 'cSjUBBbXYW7S9lMmsCTUjwljXwu8C6OuCm4PmZulCto', maxAge: 900 }
// }
// {
//   debug: 'debug',
//   code: 'CREATE_PKCECODEVERIFIER',
//   metadata: { value: 'oo5zZFOAFerwCQrsnFL8T8hPGnW0rqO5BMJYUWdX2sg', maxAge: 900 }
// }
// {
//   debug: 'debug',
//   code: 'GET_AUTHORIZATION_URL',
//   metadata: {
//     url: 'https://accounts.google.com/o/oauth2/v2/auth?client_id=437693546715-e3jh4lqsu2vmsn8elcvgj8bncmifak24.apps.googleusercontent.com&scope=openid%20email%20profile&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A4000%2Fapi%2Fauth%2Fcallback%2Fgoogle&state=cSjUBBbXYW7S9lMmsCTUjwljXwu8C6OuCm4PmZulCto&code_challenge=bUTnSv6HNaSk0j8RWN7URNEisu-bue9d_wI3hzp2YMw&code_challenge_method=S256',
//     cookies: [ [Object], [Object] ],
//     provider: {
//       id: 'google',
//       name: 'Google',
//       type: 'oauth',
//       wellKnown: 'https://accounts.google.com/.well-known/openid-configuration',
//       authorization: [Object],
//       idToken: true,
//       checks: [Array],
//       profile: [Function: profile],
//       style: [Object],
//       clientId: '437693546715-e3jh4lqsu2vmsn8elcvgj8bncmifak24.apps.googleusercontent.com',
//       clientSecret: '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',
//       signinUrl: 'http://localhost:4000/api/auth/signin/google',
//       callbackUrl: 'http://localhost:4000/api/auth/callback/google'
//     }
//   }
// }
//  POST /api/auth/signin/google 302 in 3860ms
// {
//   debug: 'debug',
//   code: 'PROFILE_DATA',
//   metadata: {
//     OAuthProfile: {
//       iss: 'https://accounts.google.com',
//       azp: '437693546715-e3jh4lqsu2vmsn8elcvgj8bncmifak24.apps.googleusercontent.com',
//       aud: '437693546715-e3jh4lqsu2vmsn8elcvgj8bncmifak24.apps.googleusercontent.com',
//       sub: '114944138612603281141',
//       email: 'neigel.e.lirasan@gmail.com',
//       email_verified: true,
//       at_hash: 'HEXKXBM5TKhowY8cDru_3w',
//       name: 'Neigel Lirasan',
//       picture: 'https://lh3.googleusercontent.com/a/ACg8ocLVnQYO1RC6axUlR_DOOlKe4HKMStHl8eOjPcHt2r9BaRiXJw=s96-c',
//       given_name: 'Neigel',
//       family_name: 'Lirasan',
//       iat: 1725208910,
//       exp: 1725212510
//     }
//   }
// }
// {
//   debug: 'debug',
//   code: 'OAUTH_CALLBACK_RESPONSE',
//   metadata: {
//     profile: {
//       id: '114944138612603281141',
//       name: 'Neigel Lirasan',
//       email: 'neigel.e.lirasan@gmail.com',
//       image: 'https://lh3.googleusercontent.com/a/ACg8ocLVnQYO1RC6axUlR_DOOlKe4HKMStHl8eOjPcHt2r9BaRiXJw=s96-c'
//     },
//     account: {
//       provider: 'google',
//       type: 'oauth',
//       providerAccountId: '114944138612603281141',
//       access_token: 'ya29.a0AcM612xknY6TLoHVX_SF83MTNR0vs1inpt3Oy5N74Onf9xv1W4L9zhj5EI6SvwNqJng0DIiKE9jWYXDd43-WC3IeR_0JGhcL-m08YaowDNXa4EgtnA6rrhQOo2rSn03aJMUQRl0b8a440pHPU9qy9OkrfjjXCIL7XHXJaszZaCgYKAdsSARASFQHGX2Mi7DAt7eoJJA8yM5z_kopZ5A0175',
//       expires_at: 1725212482,
//       scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid',
//       token_type: 'Bearer',
//       id_token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImIyZjgwYzYzNDYwMGVkMTMwNzIxMDFhOGI0MjIwNDQzNDMzZGIyODIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI0Mzc2OTM1NDY3MTUtZTNqaDRscXN1MnZtc244ZWxjdmdqOGJuY21pZmFrMjQuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI0Mzc2OTM1NDY3MTUtZTNqaDRscXN1MnZtc244ZWxjdmdqOGJuY21pZmFrMjQuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTQ5NDQxMzg2MTI2MDMyODExNDEiLCJlbWFpbCI6Im5laWdlbC5lLmxpcmFzYW5AZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJIRVhLWEJNNVRLaG93WThjRHJ1XzN3IiwibmFtZSI6Ik5laWdlbCBMaXJhc2FuIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0xWblFZTzFSQzZheFVsUl9ET09sS2U0SEtNU3RIbDhlT2pQY0h0MnI5QmFSaVhKdz1zOTYtYyIsImdpdmVuX25hbWUiOiJOZWlnZWwiLCJmYW1pbHlfbmFtZSI6IkxpcmFzYW4iLCJpYXQiOjE3MjUyMDg5MTAsImV4cCI6MTcyNTIxMjUxMH0.LWUt-TFS0BuvOkI0kZX3iV1zzQ0zy8EgUvWS2r1g_d9K2wxlVELblc-IGz_CtJuHPeEdWfVYY-oEJfac3IJdwTCvnZCWHWzoWIOI3gEtsZBZRFxN0ziWzmeFYyIVuhq9NzoqHJ0wFQ_sIiEdbox4OQfD77ymeNq-SCSwEQmRW3ySWE16bcd_H55fsXfOYqNzvRldgTb6RG_lbsG3uOLEZnux3kbNRfGCK6ld7dA4AO6e0UCgD5yxwdQS7odxY030y9_bc9JCHUxWyzgWaoplNK16pWavFQc6gGlmOgnDcJD_lDYhddoVhsc7jf8UuQvRB4idx6hD6E4Mjr-nBwPHgA'
//     },
//     OAuthProfile: {
//       iss: 'https://accounts.google.com',
//       azp: '437693546715-e3jh4lqsu2vmsn8elcvgj8bncmifak24.apps.googleusercontent.com',
//       aud: '437693546715-e3jh4lqsu2vmsn8elcvgj8bncmifak24.apps.googleusercontent.com',
//       sub: '114944138612603281141',
//       email: 'neigel.e.lirasan@gmail.com',
//       email_verified: true,
//       at_hash: 'HEXKXBM5TKhowY8cDru_3w',
//       name: 'Neigel Lirasan',
//       picture: 'https://lh3.googleusercontent.com/a/ACg8ocLVnQYO1RC6axUlR_DOOlKe4HKMStHl8eOjPcHt2r9BaRiXJw=s96-c',
//       given_name: 'Neigel',
//       family_name: 'Lirasan',
//       iat: 1725208910,
//       exp: 1725212510
//     }
//   }
// }
// {
//   signIn: 'signIn',
//   user: {
//     id: '114944138612603281141',
//     name: 'Neigel Lirasan',
//     email: 'neigel.e.lirasan@gmail.com',
//     image: 'https://lh3.googleusercontent.com/a/ACg8ocLVnQYO1RC6axUlR_DOOlKe4HKMStHl8eOjPcHt2r9BaRiXJw=s96-c'
//   },
//   profile: {
//     iss: 'https://accounts.google.com',
//     azp: '437693546715-e3jh4lqsu2vmsn8elcvgj8bncmifak24.apps.googleusercontent.com',
//     aud: '437693546715-e3jh4lqsu2vmsn8elcvgj8bncmifak24.apps.googleusercontent.com',
//     sub: '114944138612603281141',
//     email: 'neigel.e.lirasan@gmail.com',
//     email_verified: true,
//     at_hash: 'HEXKXBM5TKhowY8cDru_3w',
//     name: 'Neigel Lirasan',
//     picture: 'https://lh3.googleusercontent.com/a/ACg8ocLVnQYO1RC6axUlR_DOOlKe4HKMStHl8eOjPcHt2r9BaRiXJw=s96-c',
//     given_name: 'Neigel',
//     family_name: 'Lirasan',
//     iat: 1725208910,
//     exp: 1725212510
//   }
// }
// {
//   jwt: 'jwt',
//   token: {
//     name: 'Neigel Lirasan',
//     email: 'neigel.e.lirasan@gmail.com',
//     picture: 'https://lh3.googleusercontent.com/a/ACg8ocLVnQYO1RC6axUlR_DOOlKe4HKMStHl8eOjPcHt2r9BaRiXJw=s96-c',
//     sub: '114944138612603281141'
//   },
//   account: {
//     provider: 'google',
//     type: 'oauth',
//     providerAccountId: '114944138612603281141',
//     access_token: 'ya29.a0AcM612xknY6TLoHVX_SF83MTNR0vs1inpt3Oy5N74Onf9xv1W4L9zhj5EI6SvwNqJng0DIiKE9jWYXDd43-WC3IeR_0JGhcL-m08YaowDNXa4EgtnA6rrhQOo2rSn03aJMUQRl0b8a440pHPU9qy9OkrfjjXCIL7XHXJaszZaCgYKAdsSARASFQHGX2Mi7DAt7eoJJA8yM5z_kopZ5A0175',
//     expires_at: 1725212482,
//     scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid',
//     token_type: 'Bearer',
//     id_token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImIyZjgwYzYzNDYwMGVkMTMwNzIxMDFhOGI0MjIwNDQzNDMzZGIyODIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI0Mzc2OTM1NDY3MTUtZTNqaDRscXN1MnZtc244ZWxjdmdqOGJuY21pZmFrMjQuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI0Mzc2OTM1NDY3MTUtZTNqaDRscXN1MnZtc244ZWxjdmdqOGJuY21pZmFrMjQuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTQ5NDQxMzg2MTI2MDMyODExNDEiLCJlbWFpbCI6Im5laWdlbC5lLmxpcmFzYW5AZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJIRVhLWEJNNVRLaG93WThjRHJ1XzN3IiwibmFtZSI6Ik5laWdlbCBMaXJhc2FuIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0xWblFZTzFSQzZheFVsUl9ET09sS2U0SEtNU3RIbDhlT2pQY0h0MnI5QmFSaVhKdz1zOTYtYyIsImdpdmVuX25hbWUiOiJOZWlnZWwiLCJmYW1pbHlfbmFtZSI6IkxpcmFzYW4iLCJpYXQiOjE3MjUyMDg5MTAsImV4cCI6MTcyNTIxMjUxMH0.LWUt-TFS0BuvOkI0kZX3iV1zzQ0zy8EgUvWS2r1g_d9K2wxlVELblc-IGz_CtJuHPeEdWfVYY-oEJfac3IJdwTCvnZCWHWzoWIOI3gEtsZBZRFxN0ziWzmeFYyIVuhq9NzoqHJ0wFQ_sIiEdbox4OQfD77ymeNq-SCSwEQmRW3ySWE16bcd_H55fsXfOYqNzvRldgTb6RG_lbsG3uOLEZnux3kbNRfGCK6ld7dA4AO6e0UCgD5yxwdQS7odxY030y9_bc9JCHUxWyzgWaoplNK16pWavFQc6gGlmOgnDcJD_lDYhddoVhsc7jf8UuQvRB4idx6hD6E4Mjr-nBwPHgA'
//   }
// }
// {
//   signin: 'signin',
//   message: {
//     user: {
//       id: '114944138612603281141',
//       name: 'Neigel Lirasan',
//       email: 'neigel.e.lirasan@gmail.com',
//       image: 'https://lh3.googleusercontent.com/a/ACg8ocLVnQYO1RC6axUlR_DOOlKe4HKMStHl8eOjPcHt2r9BaRiXJw=s96-c'
//     },
//     account: {
//       provider: 'google',
//       type: 'oauth',
//       providerAccountId: '114944138612603281141',
//       access_token: 'ya29.a0AcM612xknY6TLoHVX_SF83MTNR0vs1inpt3Oy5N74Onf9xv1W4L9zhj5EI6SvwNqJng0DIiKE9jWYXDd43-WC3IeR_0JGhcL-m08YaowDNXa4EgtnA6rrhQOo2rSn03aJMUQRl0b8a440pHPU9qy9OkrfjjXCIL7XHXJaszZaCgYKAdsSARASFQHGX2Mi7DAt7eoJJA8yM5z_kopZ5A0175',
//       expires_at: 1725212482,
//       scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid',
//       token_type: 'Bearer',
//       id_token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImIyZjgwYzYzNDYwMGVkMTMwNzIxMDFhOGI0MjIwNDQzNDMzZGIyODIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI0Mzc2OTM1NDY3MTUtZTNqaDRscXN1MnZtc244ZWxjdmdqOGJuY21pZmFrMjQuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI0Mzc2OTM1NDY3MTUtZTNqaDRscXN1MnZtc244ZWxjdmdqOGJuY21pZmFrMjQuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTQ5NDQxMzg2MTI2MDMyODExNDEiLCJlbWFpbCI6Im5laWdlbC5lLmxpcmFzYW5AZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJIRVhLWEJNNVRLaG93WThjRHJ1XzN3IiwibmFtZSI6Ik5laWdlbCBMaXJhc2FuIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0xWblFZTzFSQzZheFVsUl9ET09sS2U0SEtNU3RIbDhlT2pQY0h0MnI5QmFSaVhKdz1zOTYtYyIsImdpdmVuX25hbWUiOiJOZWlnZWwiLCJmYW1pbHlfbmFtZSI6IkxpcmFzYW4iLCJpYXQiOjE3MjUyMDg5MTAsImV4cCI6MTcyNTIxMjUxMH0.LWUt-TFS0BuvOkI0kZX3iV1zzQ0zy8EgUvWS2r1g_d9K2wxlVELblc-IGz_CtJuHPeEdWfVYY-oEJfac3IJdwTCvnZCWHWzoWIOI3gEtsZBZRFxN0ziWzmeFYyIVuhq9NzoqHJ0wFQ_sIiEdbox4OQfD77ymeNq-SCSwEQmRW3ySWE16bcd_H55fsXfOYqNzvRldgTb6RG_lbsG3uOLEZnux3kbNRfGCK6ld7dA4AO6e0UCgD5yxwdQS7odxY030y9_bc9JCHUxWyzgWaoplNK16pWavFQc6gGlmOgnDcJD_lDYhddoVhsc7jf8UuQvRB4idx6hD6E4Mjr-nBwPHgA'
//     },
//     profile: {
//       id: '114944138612603281141',
//       name: 'Neigel Lirasan',
//       email: 'neigel.e.lirasan@gmail.com',
//       image: 'https://lh3.googleusercontent.com/a/ACg8ocLVnQYO1RC6axUlR_DOOlKe4HKMStHl8eOjPcHt2r9BaRiXJw=s96-c'
//     },
//     isNewUser: undefined
//   }
// }
//  GET /api/auth/callback/google?state=cSjUBBbXYW7S9lMmsCTUjwljXwu8C6OuCm4PmZulCto&code=4%2F0AQlEd8w4QiDO98Vgp2ZBkD-4LZsGjIWqEih7tCxGAnm3aKu98QX7Fg37pznEG4R0rTlx9g&scope=email+profile+openid+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&authuser=4&prompt=consent 302 in 2028ms
//  ○ Compiling / ...
//  ✓ Compiled / in 4.2s (835 modules)
//  ✓ Compiled in 970ms (289 modules)
//  GET / 200 in 5427ms