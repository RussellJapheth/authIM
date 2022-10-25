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
    // get all users
    let users = await Users.findAll();

    // Create a new user
    let user = await Users.create({
        username: "Randell",
        password: "password",
        email: "randell@example.com",
    });
    console.log(user.id);

    // find a user
    user = await Users.findById(1);

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

    // check if a user has a permission
    if(await user.hasPermission(permission)){
        console.log("User has permission")
    }
});
```

### Groups

```js
// ...
// Get all groups
let groups = await Groups.findAll();

// create a new group
let group = await Groups.create({
    groupName: "supervisors",
});

// find a group
group = await Groups.findById(1);

// add a permission to a group
await Groups.addPermissionById(group.id, permission.id);

// remove a permission from a group
await Groups.removePermission(group.id, permission.id);

// add a user to a group
await Groups.addUserById(group.id, user.id);

// remove a user from a group
await Groups.removeUser(group.id, user.id);

// check if a group has a permission
if (await group.hasPermission(permission)) {
    console.log("Group has permission");
}
```

### Roles

```js
// ...
// Get all roles
let roles = Roles.findAll();

// create a new role
let role = await Roles.create({
    roleName: "admin",
});

// find a role
role = await Roles.findById(1);

// add a permission to a role
await Roles.addPermissionById(role.id, permission.id);

// remove a permission from a role
await Roles.removePermission(role.id, permission.id);

// add a user to a role
await Roles.addUserById(role.id, user.id);

// remove a user from a role
await Roles.removeUser(role.id, user.id);

// check if a role has a permission
if (await role.hasPermission(permission)) {
    console.log("Role has permission");
}
```

### Permissions

```js
// ...
// Get all permissions
let permissions = await Permissions.findAll();

// create a new permission
let permission = await Permissions.create({
    permissionName: "create",
});

// find a permission
permission = await Permissions.findById(1);

// get all groups with permission
let groups = await Permissions.getAllGroups(permission.id);

// get all users with permission
let users = await Permissions.getAllUsers(permission.id);

// get all roles with permission
let roles = await Permissions.getAllRoles(permission.id);
```

## API Documentation

```bash
jsdoc -r ./src/
```

_\*requires jsdoc_

## Extending

AuthIM is built on [Sequlize](https://sequelize.org/) and its methods are available on returned results.

## Tests

```bash
npm run test
```

_\*for running unit tests, an in-memory sqlite database is used_
