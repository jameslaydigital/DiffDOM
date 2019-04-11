"use strict";

const model = [
    {fname: "jim", lname: "bob"},
    {fname: "johnny", lname: "blue"},
    {fname: "sarah", lname: "red"},
    {fname: "jessica", lname: "greene"},
];

function get_view(model) {
    return `
        <div>
            <ul>
            ${model.map(user => 
                `<li><input value="${user.fname}" />${user.fname} ${user.lname}</li>`
            ).join("")}
            </ul>
        </div>
    `;
}

const root = document.getElementById("approot");
setInterval(() => {
    apply_diffs(root, get_view(model));
}, 1000);
