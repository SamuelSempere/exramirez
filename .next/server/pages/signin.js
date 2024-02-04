"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/signin";
exports.ids = ["pages/signin"];
exports.modules = {

/***/ "./pages/signin.js":
/*!*************************!*\
  !*** ./pages/signin.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ SignIn)\n/* harmony export */ });\n/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth/react */ \"next-auth/react\");\n/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth_react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/router */ \"next/router\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__);\nvar _jsxFileName = \"C:\\\\Users\\\\chemp\\\\Documents\\\\Repositorios\\\\Personal\\\\nextjsLogin\\\\pages\\\\signin.js\";\n// pages/signin.js\n\n\n\n\nfunction SignIn() {\n  const {\n    data: session,\n    status\n  } = (0,next_auth_react__WEBPACK_IMPORTED_MODULE_0__.useSession)();\n  const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {\n    if (status === \"authenticated\") {\n      router.push('/');\n    }\n  }, [session, status, router]);\n\n  const handleLogin = async event => {\n    event.preventDefault();\n    const formData = new FormData(event.currentTarget);\n    const email = formData.get('email');\n    const password = formData.get('password'); // Aquí invocamos el inicio de sesión de next-auth\n\n    const result = await (0,next_auth_react__WEBPACK_IMPORTED_MODULE_0__.signIn)('credentials', {\n      redirect: false,\n      email: email,\n      password: password\n    }); // Maneja aquí el resultado según sea necesario\n\n    if (result.error) {// muestra un mensaje de error\n    } else {// redirige al usuario o haz algo más\n    }\n  };\n\n  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(\"div\", {\n    className: \"container\",\n    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(\"div\", {\n      className: \"left-column\"\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 39,\n      columnNumber: 3\n    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(\"div\", {\n      className: \"right-column\",\n      children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(\"div\", {\n        className: \"login-form-container\",\n        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(\"h2\", {\n          children: \"Hola, bienvenido!\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 43,\n          columnNumber: 7\n        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(\"p\", {\n          children: \"Para acceder, introduce tu email y contrase\\xF1a.\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 44,\n          columnNumber: 7\n        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(\"form\", {\n          onSubmit: handleLogin,\n          children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(\"div\", {\n            className: \"input-group\",\n            children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(\"input\", {\n              type: \"email\",\n              id: \"email\",\n              name: \"email\",\n              placeholder: \"E-mail\",\n              required: true\n            }, void 0, false, {\n              fileName: _jsxFileName,\n              lineNumber: 47,\n              columnNumber: 11\n            }, this)\n          }, void 0, false, {\n            fileName: _jsxFileName,\n            lineNumber: 46,\n            columnNumber: 9\n          }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(\"div\", {\n            className: \"input-group\",\n            children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(\"input\", {\n              type: \"password\",\n              id: \"password\",\n              name: \"password\",\n              placeholder: \"Password\",\n              required: true\n            }, void 0, false, {\n              fileName: _jsxFileName,\n              lineNumber: 50,\n              columnNumber: 11\n            }, this)\n          }, void 0, false, {\n            fileName: _jsxFileName,\n            lineNumber: 49,\n            columnNumber: 9\n          }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(\"button\", {\n            type: \"submit\",\n            children: \"ENTRAR\"\n          }, void 0, false, {\n            fileName: _jsxFileName,\n            lineNumber: 52,\n            columnNumber: 9\n          }, this)]\n        }, void 0, true, {\n          fileName: _jsxFileName,\n          lineNumber: 45,\n          columnNumber: 7\n        }, this)]\n      }, void 0, true, {\n        fileName: _jsxFileName,\n        lineNumber: 42,\n        columnNumber: 5\n      }, this)\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 41,\n      columnNumber: 3\n    }, this)]\n  }, void 0, true, {\n    fileName: _jsxFileName,\n    lineNumber: 38,\n    columnNumber: 5\n  }, this);\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9zaWduaW4uanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBOztBQUdlLFNBQVNJLE1BQVQsR0FBa0I7QUFDL0IsUUFBTTtBQUFFQyxJQUFBQSxJQUFJLEVBQUVDLE9BQVI7QUFBaUJDLElBQUFBO0FBQWpCLE1BQTRCUCwyREFBVSxFQUE1QztBQUNBLFFBQU1RLE1BQU0sR0FBR0wsc0RBQVMsRUFBeEI7QUFFQUQsRUFBQUEsZ0RBQVMsQ0FBQyxNQUFNO0FBQ2QsUUFBSUssTUFBTSxLQUFLLGVBQWYsRUFBZ0M7QUFDOUJDLE1BQUFBLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZLEdBQVo7QUFDRDtBQUNGLEdBSlEsRUFJTixDQUFDSCxPQUFELEVBQVVDLE1BQVYsRUFBa0JDLE1BQWxCLENBSk0sQ0FBVDs7QUFLQSxRQUFNRSxXQUFXLEdBQUcsTUFBT0MsS0FBUCxJQUFpQjtBQUNuQ0EsSUFBQUEsS0FBSyxDQUFDQyxjQUFOO0FBQ0EsVUFBTUMsUUFBUSxHQUFHLElBQUlDLFFBQUosQ0FBYUgsS0FBSyxDQUFDSSxhQUFuQixDQUFqQjtBQUNBLFVBQU1DLEtBQUssR0FBR0gsUUFBUSxDQUFDSSxHQUFULENBQWEsT0FBYixDQUFkO0FBQ0EsVUFBTUMsUUFBUSxHQUFHTCxRQUFRLENBQUNJLEdBQVQsQ0FBYSxVQUFiLENBQWpCLENBSm1DLENBTW5DOztBQUNBLFVBQU1FLE1BQU0sR0FBRyxNQUFNbEIsdURBQU0sQ0FBQyxhQUFELEVBQWdCO0FBQ3pDbUIsTUFBQUEsUUFBUSxFQUFFLEtBRCtCO0FBRXpDSixNQUFBQSxLQUFLLEVBQUVBLEtBRmtDO0FBR3pDRSxNQUFBQSxRQUFRLEVBQUVBO0FBSCtCLEtBQWhCLENBQTNCLENBUG1DLENBYW5DOztBQUNBLFFBQUlDLE1BQU0sQ0FBQ0UsS0FBWCxFQUFrQixDQUNoQjtBQUNELEtBRkQsTUFFTyxDQUNMO0FBQ0Q7QUFDRixHQW5CRDs7QUFxQkEsc0JBQ0U7QUFBSyxhQUFTLEVBQUMsV0FBZjtBQUFBLDRCQUNGO0FBQUssZUFBUyxFQUFDO0FBQWY7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQURFLGVBR0Y7QUFBSyxlQUFTLEVBQUMsY0FBZjtBQUFBLDZCQUNFO0FBQUssaUJBQVMsRUFBQyxzQkFBZjtBQUFBLGdDQUNFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGdCQURGLGVBRUU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsZ0JBRkYsZUFHRTtBQUFNLGtCQUFRLEVBQUVYLFdBQWhCO0FBQUEsa0NBQ0U7QUFBSyxxQkFBUyxFQUFDLGFBQWY7QUFBQSxtQ0FDRTtBQUFPLGtCQUFJLEVBQUMsT0FBWjtBQUFvQixnQkFBRSxFQUFDLE9BQXZCO0FBQStCLGtCQUFJLEVBQUMsT0FBcEM7QUFBNEMseUJBQVcsRUFBQyxRQUF4RDtBQUFpRSxzQkFBUTtBQUF6RTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBREY7QUFBQTtBQUFBO0FBQUE7QUFBQSxrQkFERixlQUlFO0FBQUsscUJBQVMsRUFBQyxhQUFmO0FBQUEsbUNBQ0U7QUFBTyxrQkFBSSxFQUFDLFVBQVo7QUFBdUIsZ0JBQUUsRUFBQyxVQUExQjtBQUFxQyxrQkFBSSxFQUFDLFVBQTFDO0FBQXFELHlCQUFXLEVBQUMsVUFBakU7QUFBNEUsc0JBQVE7QUFBcEY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURGO0FBQUE7QUFBQTtBQUFBO0FBQUEsa0JBSkYsZUFPRTtBQUFRLGdCQUFJLEVBQUMsUUFBYjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxrQkFQRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsZ0JBSEY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBREY7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQUhFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxVQURGO0FBcUJEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vcGFnZXMvc2lnbmluLmpzPzc4ZmUiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gcGFnZXMvc2lnbmluLmpzXHJcbmltcG9ydCB7IHVzZVNlc3Npb24sIHNpZ25JbiB9IGZyb20gJ25leHQtYXV0aC9yZWFjdCc7XHJcbmltcG9ydCB7IHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSAnbmV4dC9yb3V0ZXInO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFNpZ25JbigpIHtcclxuICBjb25zdCB7IGRhdGE6IHNlc3Npb24sIHN0YXR1cyB9ID0gdXNlU2Vzc2lvbigpO1xyXG4gIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKHN0YXR1cyA9PT0gXCJhdXRoZW50aWNhdGVkXCIpIHtcclxuICAgICAgcm91dGVyLnB1c2goJy8nKTtcclxuICAgIH1cclxuICB9LCBbc2Vzc2lvbiwgc3RhdHVzLCByb3V0ZXJdKTtcclxuICBjb25zdCBoYW5kbGVMb2dpbiA9IGFzeW5jIChldmVudCkgPT4ge1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xyXG4gICAgY29uc3QgZW1haWwgPSBmb3JtRGF0YS5nZXQoJ2VtYWlsJyk7XHJcbiAgICBjb25zdCBwYXNzd29yZCA9IGZvcm1EYXRhLmdldCgncGFzc3dvcmQnKTtcclxuXHJcbiAgICAvLyBBcXXDrSBpbnZvY2Ftb3MgZWwgaW5pY2lvIGRlIHNlc2nDs24gZGUgbmV4dC1hdXRoXHJcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBzaWduSW4oJ2NyZWRlbnRpYWxzJywge1xyXG4gICAgICByZWRpcmVjdDogZmFsc2UsXHJcbiAgICAgIGVtYWlsOiBlbWFpbCxcclxuICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkLFxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gTWFuZWphIGFxdcOtIGVsIHJlc3VsdGFkbyBzZWfDum4gc2VhIG5lY2VzYXJpb1xyXG4gICAgaWYgKHJlc3VsdC5lcnJvcikge1xyXG4gICAgICAvLyBtdWVzdHJhIHVuIG1lbnNhamUgZGUgZXJyb3JcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIHJlZGlyaWdlIGFsIHVzdWFyaW8gbyBoYXogYWxnbyBtw6FzXHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XHJcbiAgPGRpdiBjbGFzc05hbWU9XCJsZWZ0LWNvbHVtblwiPlxyXG4gIDwvZGl2PlxyXG4gIDxkaXYgY2xhc3NOYW1lPVwicmlnaHQtY29sdW1uXCI+XHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImxvZ2luLWZvcm0tY29udGFpbmVyXCI+XHJcbiAgICAgIDxoMj5Ib2xhLCBiaWVudmVuaWRvITwvaDI+XHJcbiAgICAgIDxwPlBhcmEgYWNjZWRlciwgaW50cm9kdWNlIHR1IGVtYWlsIHkgY29udHJhc2XDsWEuPC9wPlxyXG4gICAgICA8Zm9ybSBvblN1Ym1pdD17aGFuZGxlTG9naW59PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW5wdXQtZ3JvdXBcIj5cclxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwiZW1haWxcIiBpZD1cImVtYWlsXCIgbmFtZT1cImVtYWlsXCIgcGxhY2Vob2xkZXI9XCJFLW1haWxcIiByZXF1aXJlZCAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW5wdXQtZ3JvdXBcIj5cclxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwicGFzc3dvcmRcIiBpZD1cInBhc3N3b3JkXCIgbmFtZT1cInBhc3N3b3JkXCIgcGxhY2Vob2xkZXI9XCJQYXNzd29yZFwiIHJlcXVpcmVkIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCI+RU5UUkFSPC9idXR0b24+XHJcbiAgICAgIDwvZm9ybT5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG48L2Rpdj5cclxuICApO1xyXG59XHJcblxyXG4iXSwibmFtZXMiOlsidXNlU2Vzc2lvbiIsInNpZ25JbiIsInVzZUVmZmVjdCIsInVzZVJvdXRlciIsIlNpZ25JbiIsImRhdGEiLCJzZXNzaW9uIiwic3RhdHVzIiwicm91dGVyIiwicHVzaCIsImhhbmRsZUxvZ2luIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsImZvcm1EYXRhIiwiRm9ybURhdGEiLCJjdXJyZW50VGFyZ2V0IiwiZW1haWwiLCJnZXQiLCJwYXNzd29yZCIsInJlc3VsdCIsInJlZGlyZWN0IiwiZXJyb3IiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/signin.js\n");

/***/ }),

/***/ "next-auth/react":
/*!**********************************!*\
  !*** external "next-auth/react" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("next-auth/react");

/***/ }),

/***/ "next/router":
/*!******************************!*\
  !*** external "next/router" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("next/router");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/signin.js"));
module.exports = __webpack_exports__;

})();