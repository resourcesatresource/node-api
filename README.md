# node-api

## [0.0.24-rc-4]

- Now the `auth` middleware can read token from request body.
- New route to verify `accessToken`.

## [0.0.24-rc-3]

- Now the token will be expired in 1hr after its creation.
- Now we log raw captured errors in the `dev` environment.

## [0.0.24-rc-2]

- Added route for supporting reset password

## [0.0.24-rc-1]

- Fixed authorization middleware using outdated config

## [0.0.24-rc-0]

- Added new route GET route for admin requester list
- Updated routes for requiring super admin access

## [0.0.23]

- Added new route for changing user password
- Improved error handling and dev support

## [0.0.23-rc-0]

- Added new field in genre to store author context
- User can now delete genre if they are author

## [0.0.23]

- Customers route for create, update and get connections
- User routes simplified with better error handling

## [0.0.22]

- Authentication route simplified with proper error handling and response
- Logger middleware is added for development support

## [0.0.21]

- Genre routes are organized with better error support
- Deployment will only be triggered with version update
