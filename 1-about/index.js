var fs = require('fs')
var verify = require('adventure-verify')
var spawn = require('child_process').spawn
var concat = require('concat-stream')

exports.problem = fs.readFileSync(__dirname + '/problem.txt', 'utf-8')
exports.solution = fs.readFileSync(__dirname + '/solution.txt', 'utf-8')

exports.verify = verify({modeReset: true}, function (args, t) {
  //t.plan(3);
  t.equal(args.length, 1, 'palmetto-adventure verify YOURFILE.js');

  var ps = spawn(process.execPath, args);
  ps.stderr.pipe(process.stderr);

  ps.stdout.pipe(concat(function (body) {
    t.equal(body.toString().trim(), 'HELLO WORLD');
  }));

  ps.on('exit', function (code) {
    t.equal(code, 0, 'successful exit code');
  });
  t.end()
})

exports.run = function (args) {
  var ps = spawn(process.execPath, args);
  ps.stderr.pipe(process.stderr);
  ps.stdout.pipe(process.stdout);
  ps.once('exit', function (code) {
      if (code) process.exit(code)
  });
}