# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## Thoughts

- Using page router is easy. Need to learn nextjs. Seems cool
- I can also write server components and use it this easily all within the same app.
- Frontend is hard
- Thinking of implementing a basic jwt based session auth
  - storing jwt in localstorage for now
  - changed to httpOnly cookies
  - should I implement refresh tokens ? maybe not now

## Todo

- Reset account block after 15 mins
- limit selection
- simplify pagination
- separate services for api calls
-

## Known bugs

- Checking for user exists in db for every email (easily dos-able)
- Loaders dont work properly
- Error handling is dog shite
-
