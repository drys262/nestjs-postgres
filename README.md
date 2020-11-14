### NestJS Project with Postgres DB

### Usage

1. `git clone https://github.com/drys262/nestjs-postgres.git`
2. `cd nestjs-postgres`
3. `npm install or yarn install`

Then have a postgres server running on your machine, if you don't please install `docker` then run `docker-compose up -d` to start a postgres server on your machine using docker. Then run the following:

4. `npm start or yarn start`
5. Then go to `http://localhost:4000/users` then run those endpoints

- `GET` `/users` get all users
- `DELETE` `/users/:id` delete a specific user based on the id.
- `POST` `/users` creating a user

```
BODY
{
  "email": "charliebrown@mailinator.com",
  "firstName": "Charlie",
  "lastName": "Brown",
  "state": "VIC",
  "petExperience": "Y"
}

RESPONSE
{
    "id": "JXhgg6x-2ulZs0y5xHx5z", // id of the user
    "email": "charliebrown@mailinator.com",
    "firstName": "Charlie",
    "lastName": "Brown",
    "state": "VIC",
    "petExperience": "Y"
}
```

- `PATCH` `/users/:id` updating a user

```
BODY
{
  "email": "newemail@mailinator.com", // optional
  "firstName": "newFirstName", // optional
  "lastName": "newLastName", // optional
  "state": "VIC", // optional
  "petExperience": "Y" // optional
}

RESPONSE
{
    "id": "JXhgg6x-2ulZs0y5xHx5z", // id of the user
    "email": "newemail@mailinator.com",
    "firstName": "newFirstName",
    "lastName": "newLastName",
    "state": "VIC",
    "petExperience": "Y"
}
```

### Testing

First you need to setup your test environment

1. Please run this command on the terminal (please change the placeholders `username` and`password`)
   `TYPEORM_CONNECTION=postgres TYPEORM_URL=postgres://<username>:<password>@localhost:5432/e2e_test TYPEORM_ENTITIES=src/**/*.entity.ts yarn ts-node node_modules/.bin/typeorm schema:sync`

2. Then you can run the `npm test or yarn test`
