var profiler = require('../')
profiler.startProfiling('cpu-block')

function bootstrap() {
  function pre(cb) {
    var num = 0
    for (var i = 1e6 - 1; i >= 0; i--) {
      num++
    }
    return cb()
  }

  function post() {
    profiler.writeFile(profiler.stopProfiling('cpu-block'))
  }

  function init(cb) {
    for (var i = 1e8 - 1; i >= 0; i--) {
      var a = 16 + 87
      a = a - 10
    }
    cb()
  }

  pre(function preInner() {
    init(function initInner() {
      for (var i = 1e8 - 1; i >= 0; i--) {
        var a = 1 + 1
        a = a + 1
      }
      pre(function preInner() {
        init(function initInner() {
          for (var i = 1e8 - 1; i >= 0; i--) {
            var a = 1 + 1
            a = a + 1
          }
          post()
        })
      })
    })
  })
}

bootstrap()