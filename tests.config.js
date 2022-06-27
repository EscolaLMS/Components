const React = require("react");
const ReactDOM = require("react-dom");

const context = {
    include: [['[data-preview]']]
}

const axe = require("@axe-core/react");
axe(React, ReactDOM, 1000, undefined, context);
