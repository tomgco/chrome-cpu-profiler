var profiler = require('strong-cpu-profiler')
  , _ = require('lodash')
  , fs = require('fs')
  , timings = {}

function profile(item, date) {
  var data = _.clone(item.topRoot)
  followChild(item.topRoot, data)
  return { head: data
    , startTime: timings[item.title]
    , endTime: date
  }
}

function followChild(source, dest) {
  // Display url with path
  dest.url = dest.scriptName.replace(source.rootPath, '')
  // New chrome wants a hit count, this add backwards compatibility
  // hopefully these are the same
  dest.hitCount = dest.selfSamplesCount

  // Sometimes we can have children count of zero so lets add no children
  // so flame graph works
  if (!dest.children) {
    dest.children = []
  }

  // If the node has children then continue
  if (source.childrenCount > 0) {
    for (var i = 0; i < source.childrenCount; i++) {
      var child = source.getChild(i)
        , newChild = _.clone(child)

      followChild(child, newChild)
      dest.children.push(newChild)
    }
  }
}

// Wrap start profiling to grab current time
profile.startProfiling = function (name) {
  timings[name] = +Date.now() / 1000
  return profiler.startProfiling(name)
}

// Wrap stop profiling to format before returning
profile.stopProfiling = function (name) {
  var data = profile(profiler.stopProfiling(name), Date.now() / 1000)
  if (timings[name]) {
    delete timings[name]
  }
  return data
}

profile.writeFile = function (file, data, cb) {
  if (!cb) {
    cb = function () {}
  }
  if (file !== 'string') {
    data = file
    file = false
  }
  if (typeof data === 'object') {
    data = JSON.stringify(data)
  }
  fs.writeFile(file || 'CPU-' + Date.now() + '.cpuprofile', data, cb)
}

module.exports = profile