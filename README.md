# authim

> 💡 A light weight nodejs authentication and authorization module.

## Database Schema

[The database schema](https://dbdiagram.io/d/63565a48fa2755667d5abd04)

## Usage

After downloading the library require using

```js
const { Users, Permissions, Groups, Roles, AuthIM } = require("./authim");
// const auth = require("./authim/lib");
```

### Config

The following environment variables are available
environment variable|values
-|-
NODE_ENV | production\|testing\|development
DATABASE_NAME | Your mariadb database name
DATABASE_USERNAME | Your mariadb user name
DATABASE_PASSWORD | Your mariadb password

### Users

```js
AuthIM.init().then(() => {
    // Create a new user
    let user = await Users.create({
        username: "Randell",
        password: "password",
        email: "randell@example.com",
    });
    console.log(user.id);

    // Update a user
    await Users.update({
        username: "Migo",
    });

    // Attempt a login
    let login = await Users.login(
        "randell@example.com",
        "password"
    );

    if(login) {
        // login successful
        res.redirect('/');
    }
});
```

## API Documentation

```bash
jsdoc -r ./src/
```

_\*requires jsdoc_

## Tests

```bash
npm run test
```

_\*for running unit tests, an in-memory sqlite database is used_
