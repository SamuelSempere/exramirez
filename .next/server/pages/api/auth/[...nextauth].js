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
exports.id = "pages/api/auth/[...nextauth]";
exports.ids = ["pages/api/auth/[...nextauth]"];
exports.modules = {

/***/ "next-auth":
/*!****************************!*\
  !*** external "next-auth" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("next-auth");

/***/ }),

/***/ "next-auth/providers/credentials":
/*!**************************************************!*\
  !*** external "next-auth/providers/credentials" ***!
  \**************************************************/
/***/ ((module) => {

module.exports = require("next-auth/providers/credentials");

/***/ }),

/***/ "fs/promises":
/*!******************************!*\
  !*** external "fs/promises" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("fs/promises");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ "(api)/./pages/api/auth/[...nextauth].js":
/*!*****************************************!*\
  !*** ./pages/api/auth/[...nextauth].js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"next-auth\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/credentials */ \"next-auth/providers/credentials\");\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var fs_promises__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! fs/promises */ \"fs/promises\");\n/* harmony import */ var fs_promises__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(fs_promises__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_3__);\n// pages/api/auth/[...nextauth].js\n\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (next_auth__WEBPACK_IMPORTED_MODULE_0___default()({\n  pages: {\n    signIn: '/signin'\n  },\n  providers: [next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1___default()({\n    name: \"Credentials\",\n    credentials: {\n      email: {\n        label: \"email\",\n        type: \"text\",\n        placeholder: \"jsmith\"\n      },\n      password: {\n        label: \"Password\",\n        type: \"password\"\n      }\n    },\n\n    async authorize(credentials) {\n      try {\n        const jsonPath = path__WEBPACK_IMPORTED_MODULE_3___default().join(process.cwd(), 'credenciales.json');\n        const jsonString = await fs_promises__WEBPACK_IMPORTED_MODULE_2___default().readFile(jsonPath, 'utf8');\n        const jsonData = JSON.parse(jsonString); // Asegúrate de que esta parte coincida con la estructura de tu archivo JSON y con el formulario\n\n        const user = jsonData.users.find(u => u.email === credentials.email && u.password === credentials.password);\n\n        if (user) {\n          // Deberías devolver los detalles del usuario encontrado, no siempre el primer usuario en el archivo.\n          return {\n            id: user.username,\n            name: user.username,\n            email: user.email\n          };\n        } else {\n          // Si no se encuentra el usuario, retorna null para indicar un fallo en la autenticación\n          return null;\n        }\n      } catch (error) {\n        console.error(\"Error en la autorización:\", error);\n        return null;\n      }\n    }\n\n  })] // Agrega configuraciones adicionales según sea necesario\n\n}));//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQSxpRUFBZUEsZ0RBQVEsQ0FBQztBQUN0QkksRUFBQUEsS0FBSyxFQUFFO0FBQ0xDLElBQUFBLE1BQU0sRUFBRTtBQURILEdBRGU7QUFJdEJDLEVBQUFBLFNBQVMsRUFBRSxDQUNUTCxzRUFBbUIsQ0FBQztBQUNsQk0sSUFBQUEsSUFBSSxFQUFFLGFBRFk7QUFFbEJDLElBQUFBLFdBQVcsRUFBRTtBQUNYQyxNQUFBQSxLQUFLLEVBQUU7QUFBRUMsUUFBQUEsS0FBSyxFQUFFLE9BQVQ7QUFBa0JDLFFBQUFBLElBQUksRUFBRSxNQUF4QjtBQUFnQ0MsUUFBQUEsV0FBVyxFQUFFO0FBQTdDLE9BREk7QUFFWEMsTUFBQUEsUUFBUSxFQUFFO0FBQUVILFFBQUFBLEtBQUssRUFBRSxVQUFUO0FBQXFCQyxRQUFBQSxJQUFJLEVBQUU7QUFBM0I7QUFGQyxLQUZLOztBQU1sQixVQUFNRyxTQUFOLENBQWdCTixXQUFoQixFQUE2QjtBQUMzQixVQUFJO0FBQ0YsY0FBTU8sUUFBUSxHQUFHWixnREFBQSxDQUFVYyxPQUFPLENBQUNDLEdBQVIsRUFBVixFQUF5QixtQkFBekIsQ0FBakI7QUFDQSxjQUFNQyxVQUFVLEdBQUcsTUFBTWpCLDJEQUFBLENBQVlhLFFBQVosRUFBc0IsTUFBdEIsQ0FBekI7QUFDQSxjQUFNTSxRQUFRLEdBQUdDLElBQUksQ0FBQ0MsS0FBTCxDQUFXSixVQUFYLENBQWpCLENBSEUsQ0FLRjs7QUFDQSxjQUFNSyxJQUFJLEdBQUdILFFBQVEsQ0FBQ0ksS0FBVCxDQUFlQyxJQUFmLENBQW9CQyxDQUFDLElBQ2hDQSxDQUFDLENBQUNsQixLQUFGLEtBQVlELFdBQVcsQ0FBQ0MsS0FBeEIsSUFDQWtCLENBQUMsQ0FBQ2QsUUFBRixLQUFlTCxXQUFXLENBQUNLLFFBRmhCLENBQWI7O0FBS0EsWUFBSVcsSUFBSixFQUFVO0FBQ1I7QUFDQSxpQkFBTztBQUFFSSxZQUFBQSxFQUFFLEVBQUVKLElBQUksQ0FBQ0ssUUFBWDtBQUFxQnRCLFlBQUFBLElBQUksRUFBRWlCLElBQUksQ0FBQ0ssUUFBaEM7QUFBMENwQixZQUFBQSxLQUFLLEVBQUVlLElBQUksQ0FBQ2Y7QUFBdEQsV0FBUDtBQUNELFNBSEQsTUFHTztBQUNMO0FBQ0EsaUJBQU8sSUFBUDtBQUNEO0FBQ0YsT0FsQkQsQ0FtQkEsT0FBT3FCLEtBQVAsRUFBYztBQUNaQyxRQUFBQSxPQUFPLENBQUNELEtBQVIsQ0FBYywyQkFBZCxFQUEyQ0EsS0FBM0M7QUFDQSxlQUFPLElBQVA7QUFDRDtBQUNGOztBQTlCaUIsR0FBRCxDQURWLENBSlcsQ0FzQ3RCOztBQXRDc0IsQ0FBRCxDQUF2QiIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3BhZ2VzL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0uanM/NTI3ZiJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBwYWdlcy9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdLmpzXHJcbmltcG9ydCBOZXh0QXV0aCBmcm9tIFwibmV4dC1hdXRoXCJcclxuaW1wb3J0IENyZWRlbnRpYWxzUHJvdmlkZXIgZnJvbSBcIm5leHQtYXV0aC9wcm92aWRlcnMvY3JlZGVudGlhbHNcIlxyXG5pbXBvcnQgZnMgZnJvbSAnZnMvcHJvbWlzZXMnXHJcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBOZXh0QXV0aCh7XHJcbiAgcGFnZXM6IHtcclxuICAgIHNpZ25JbjogJy9zaWduaW4nLFxyXG4gIH0sXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICBDcmVkZW50aWFsc1Byb3ZpZGVyKHtcclxuICAgICAgbmFtZTogXCJDcmVkZW50aWFsc1wiLFxyXG4gICAgICBjcmVkZW50aWFsczoge1xyXG4gICAgICAgIGVtYWlsOiB7IGxhYmVsOiBcImVtYWlsXCIsIHR5cGU6IFwidGV4dFwiLCBwbGFjZWhvbGRlcjogXCJqc21pdGhcIiB9LFxyXG4gICAgICAgIHBhc3N3b3JkOiB7IGxhYmVsOiBcIlBhc3N3b3JkXCIsIHR5cGU6IFwicGFzc3dvcmRcIiB9LFxyXG4gICAgICB9LFxyXG4gICAgICBhc3luYyBhdXRob3JpemUoY3JlZGVudGlhbHMpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgY29uc3QganNvblBhdGggPSBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgJ2NyZWRlbmNpYWxlcy5qc29uJyk7XHJcbiAgICAgICAgICBjb25zdCBqc29uU3RyaW5nID0gYXdhaXQgZnMucmVhZEZpbGUoanNvblBhdGgsICd1dGY4Jyk7XHJcbiAgICAgICAgICBjb25zdCBqc29uRGF0YSA9IEpTT04ucGFyc2UoanNvblN0cmluZyk7XHJcbiAgICAgIFxyXG4gICAgICAgICAgLy8gQXNlZ8O6cmF0ZSBkZSBxdWUgZXN0YSBwYXJ0ZSBjb2luY2lkYSBjb24gbGEgZXN0cnVjdHVyYSBkZSB0dSBhcmNoaXZvIEpTT04geSBjb24gZWwgZm9ybXVsYXJpb1xyXG4gICAgICAgICAgY29uc3QgdXNlciA9IGpzb25EYXRhLnVzZXJzLmZpbmQodSA9PiBcclxuICAgICAgICAgICAgdS5lbWFpbCA9PT0gY3JlZGVudGlhbHMuZW1haWwgJiYgXHJcbiAgICAgICAgICAgIHUucGFzc3dvcmQgPT09IGNyZWRlbnRpYWxzLnBhc3N3b3JkXHJcbiAgICAgICAgICApO1xyXG4gICAgICBcclxuICAgICAgICAgIGlmICh1c2VyKSB7XHJcbiAgICAgICAgICAgIC8vIERlYmVyw61hcyBkZXZvbHZlciBsb3MgZGV0YWxsZXMgZGVsIHVzdWFyaW8gZW5jb250cmFkbywgbm8gc2llbXByZSBlbCBwcmltZXIgdXN1YXJpbyBlbiBlbCBhcmNoaXZvLlxyXG4gICAgICAgICAgICByZXR1cm4geyBpZDogdXNlci51c2VybmFtZSwgbmFtZTogdXNlci51c2VybmFtZSwgZW1haWw6IHVzZXIuZW1haWwgfTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIFNpIG5vIHNlIGVuY3VlbnRyYSBlbCB1c3VhcmlvLCByZXRvcm5hIG51bGwgcGFyYSBpbmRpY2FyIHVuIGZhbGxvIGVuIGxhIGF1dGVudGljYWNpw7NuXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBlbiBsYSBhdXRvcml6YWNpw7NuOlwiLCBlcnJvcik7XHJcbiAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgXSxcclxuICAvLyBBZ3JlZ2EgY29uZmlndXJhY2lvbmVzIGFkaWNpb25hbGVzIHNlZ8O6biBzZWEgbmVjZXNhcmlvXHJcbn0pXHJcblxyXG4iXSwibmFtZXMiOlsiTmV4dEF1dGgiLCJDcmVkZW50aWFsc1Byb3ZpZGVyIiwiZnMiLCJwYXRoIiwicGFnZXMiLCJzaWduSW4iLCJwcm92aWRlcnMiLCJuYW1lIiwiY3JlZGVudGlhbHMiLCJlbWFpbCIsImxhYmVsIiwidHlwZSIsInBsYWNlaG9sZGVyIiwicGFzc3dvcmQiLCJhdXRob3JpemUiLCJqc29uUGF0aCIsImpvaW4iLCJwcm9jZXNzIiwiY3dkIiwianNvblN0cmluZyIsInJlYWRGaWxlIiwianNvbkRhdGEiLCJKU09OIiwicGFyc2UiLCJ1c2VyIiwidXNlcnMiLCJmaW5kIiwidSIsImlkIiwidXNlcm5hbWUiLCJlcnJvciIsImNvbnNvbGUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./pages/api/auth/[...nextauth].js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/auth/[...nextauth].js"));
module.exports = __webpack_exports__;

})();