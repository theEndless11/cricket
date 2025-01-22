"use strict";

// api/cricket.js
var fetch = require('node-fetch');

var API_KEY = 'Y03c671f8-cc23-454a-9a6e-e04689145c8e'; // Your CricAPI key

module.exports = function _callee(req, res) {
  var matchId, response, data;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          matchId = req.query.matchId; // Get the matchId from the query parameters

          if (matchId) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            error: 'matchId is required'
          }));

        case 3:
          _context.prev = 3;
          _context.next = 6;
          return regeneratorRuntime.awrap(fetch("https://cricapi.com/api/cricket?apikey=".concat(API_KEY, "&matchId=").concat(matchId)));

        case 6:
          response = _context.sent;
          _context.next = 9;
          return regeneratorRuntime.awrap(response.json());

        case 9:
          data = _context.sent;
          res.status(200).json(data);
          _context.next = 16;
          break;

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](3);
          res.status(500).json({
            error: 'Failed to fetch data from CricAPI'
          });

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 13]]);
};
//# sourceMappingURL=cricket.dev.js.map
