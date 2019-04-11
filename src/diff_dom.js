"use strict";

(() => {
    function diff_dom(root, newstr) {
        const frag = document.createElement("div");
        frag.innerHTML = newstr;
        diff_children(root, frag);
    }

    function diff(rootDOM, newDOM) {
        if (newDOM instanceof HTMLElement && rootDOM instanceof HTMLElement ||
            newDOM instanceof Text && rootDOM instanceof Text) {

            // if same types, we can diff
            if (newDOM instanceof HTMLElement) {
                diff_html_node(rootDOM, newDOM);
            } else if (newDOM instanceof Text) {
                diff_text(rootDOM, newDOM);
            } else {
                throw new TypeError("No way to diff element: ", newDOM);
            }
        } else {
            // if they're different types, just replace whole branch
            rootDOM.parentNode.replaceChild(newDOM, rootDOM);
        }
    }

    function diff_text(rootDOM, newDOM) {
        rootDOM.textContent = newDOM.textContent;
    }

    function diff_html_node(rootDOM, newDOM) {
        diff_attributes(rootDOM, newDOM);
        diff_children(rootDOM, newDOM);
    }

    function diff_attributes(rootDOM, newDOM) {
        // delete old attrs //
        for (const attr_name of rootDOM.getAttributeNames()) {
            if (!newDOM.hasAttribute(attr_name)) {
                rootDOM.removeAttribute(attr_name);
            }
        }

        // add/set other attrs //
        for (const attr_name of newDOM.getAttributeNames()) {
            if (rootDOM[attr_name] !== newDOM[attr_name]) {
                rootDOM[attr_name] = newDOM.getAttribute(attr_name);
            }
        }
    }

    function diff_children(rootDOM, newDOM) {
        const old_length = rootDOM.childNodes.length;
        const new_length = newDOM.childNodes.length;
        const least_length = Math.min(old_length, new_length);
        const greatest_length = Math.max(old_length, new_length);
        const deletables = [];
        const appendables = [];

        for (let i = 0; i < greatest_length; i++) {
            if (i < least_length) {
                // diff existing child
                diff(rootDOM.childNodes[i], newDOM.childNodes[i]);
            } else {
                // remove / add excess child
                if (old_length > new_length) {
                    deletables.push(rootDOM.childNodes[i]);
                } else {
                    appendables.push(newDOM.childNodes[i]);
                }
            }
        }

        // delete
        for (const node of deletables) {
            node.parentNode.removeChild(node);
        }
        // add
        for (const node of appendables) {
            rootDOM.appendChild(node);
        }
    }

    window.diff_dom = diff_dom;
})();
