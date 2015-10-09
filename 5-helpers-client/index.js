var fs = require('fs')
var verify = require('adventure-verify')
var path = require('path')
var concat = require('concat-stream')

exports.problem = fs.readFileSync(__dirname + '/problem.txt', 'utf-8')
exports.solution = fs.readFileSync(__dirname + '/solution.txt', 'utf-8')

exports.verify = verify({modeReset: true}, function (args, t) {

  var response = require('palmettoflow-event').response
  var palmetto = require('palmettoflow-nodejs')
  var ee = palmetto()
  var list = [{name: 'Thing 1'}, {name: 'Thing 2'}]
  ee.on('send', function (e) {
    if (e.to !== '/widgets/list') {
      t.deepEquals(e.object, list)
      t.end()
    }
  })

  ee.on('/widgets/list', function (e) {
    var result = list
    ee.emit('send', response(e, result))
  })


  var res = require(path.resolve(args[0]))

})

exports.run = function (args) {

  var response = require('palmettoflow-event').response
  var palmetto = require('palmettoflow-nodejs')
  var ee = palmetto()
  ee.on('/widgets/list', function (e) {
    var result = [{name: 'Thing 1'}, {name: 'Thing 2'}]
    ee.emit('send', response(e, result))
  })
  var res = require(path.resolve(args[0]))

}