const React = require("react");
const ReactDOM = require("react-dom");

const context = {
  include: [[".wellms-component"]],
};

if (process.env.NODE_ENV !== "production") {
  var axe = require("react-axe");
  axe(React, ReactDOM, 1000, undefined, context);
}
