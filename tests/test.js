const { Users, Permissions, Groups, Roles, AuthIM } = require("../lib");

it("Init the database", async () => {
    expect.assertions(1);
    expect(await AuthIM.init()).toBeTruthy();
});

it("Create a user", async () => {
    expect.assertions(1);
    let user = await Users.create({
        username: "Randell",
        password: "password",
        email: "randell@example.com",
    });

    expect(user.username).toBe("Randell");
});

it("Attempt to login", async () => {
    expect.assertions(1);
    let user = await Users.login("randell@example.com", "password");

    expect(user).toBeTruthy();
});

it("Update a user", async () => {
    expect.assertions(1);
    let user = await Users.update({
        id: 1,
        username: "Migo",
    });
    expect(user.username).toBe("Migo");
});

it("Create a permission", async () => {
    expect.assertions(1);
    let permission = await Permissions.create({
        permissionName: "create",
        description: "Create new documents",
    });

    expect(permission).toBeTruthy();
});

it("Create a group", async () => {
    expect.assertions(1);
    let group = await Groups.create({
        groupName: "supervisors",
    });

    expect(group).toBeTruthy();
});

it("Create a role", async () => {
    expect.assertions(1);
    let role = await Roles.create({
        roleName: "admin",
    });

    expect(role).toBeTruthy();
});

it("Assign permission to a role", async () => {
    expect.assertions(1);
    let role = await Roles.addPermissionById(1, 1);

    expect(role).toBeTruthy();
});

it("Assign user to a role", async () => {
    expect.assertions(1);
    let role = await Roles.addUserById(1, 1);

    expect(role).toBeTruthy();
});

it("Assign permission to a group", async () => {
    expect.assertions(1);
    let group = await Groups.addPermissionById(1, 1);

    expect(group).toBeTruthy();
});

it("Get groups with a specific permission", async () => {
    expect.assertions(1);
    let groups = await Permissions.getAllGroups(1);

    expect(groups).toBeTruthy();
});
