# DiffDOM
Kind of like a VDOM, except not virtual.

## EXAMPLE

    const model = {
        title: "Users",
        uptime: 0.0,
        users: [
            { name: "Johnny" },
            { name: "Sarah" },
            { name: "Sally" },
        ]
    };

    const get_view() => `
        <h1>${model.title}</h1>
        <div>Uptime: ${model.uptime}</div>
        <ul>
            ${model.users.map(user => `<li>${user.name}</li>`).join("")}
        </ul>
    `;

    const root = document.body;

    setInterval(() => {
        model.uptime++;
        diff_dom(root, get_view());
    }, 1000);

