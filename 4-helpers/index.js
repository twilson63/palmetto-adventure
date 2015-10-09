var fs = require('fs')
var verify = require('adventure-verify')
var spawn = require('child_process').spawn
var concat = require('concat-stream')
var path = require('path')

exports.problem = fs.readFileSync(__dirname + '/problem.txt', 'utf-8')
exports.solution = fs.readFileSync(__dirname + '/solution.txt', 'utf-8')

exports.verify = verify({modeReset: true}, function (args, t) {
  var res = require(path.resolve(args[0]))
  var newEvent = require('palmettoflow-event').newEvent
  var palmetto = require('palmettoflow-nodejs')
  var ee = palmetto()
  res(ee)
  var ne = newEvent('widgets', 'create', { name: 'thing 1'})
  ee.once(ne.from, function (e) {
    t.ok(e.object.ok, 'Service returned ok = true')
    t.end()
  })
  ee.emit('send', ne)
})

exports.run = function (args) {
  var res = require(path.resolve(args[0]))
  var newEvent = require('palmettoflow-event').newEvent
  var palmetto = require('palmettoflow-nodejs')
  var ee = palmetto()
  res(ee)
  var ne = newEvent('widgets', 'create', { name: 'thing 1'})
  ee.once(ne.from, function (e) {
    console.log(e)

  })
  ee.emit('send', ne)
}