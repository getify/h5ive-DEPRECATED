H5api
=====

A collection of thin facade APIs wrapped around HTML5 JavaScript features. The goal is to provide a simple layer of abstraction on top of the native APIs, to insulate you the developer from potential inconsistencies, bugs, and even specification changes.

This is **not** a "HTML5 shim|v" for semantic tags. It is **not** a library or framework. It is **not** a polyfill for older browsers. It is **not** a replacement for Modernizr (though it *will* have basic feature tests for the APIs it includes).

Some API sugar flavor will be included, but do not expect for this library to be as sugary as something like jQuery. You can wrap other abstraction layers easily on top of H5api.


h5api.js
========

This single file is what you will include in your HTML5 JavaScript projects. It will eventually be customizable with a build-tool, so you can include only which API modules you need.

The entire API will be under the `H5` namespace. For instance, XHR2 will (probably) be exposed as `H5.xhr`.


License
=======

The code and all the documentation are released under the MIT license.

http://getify.mit-license.org/