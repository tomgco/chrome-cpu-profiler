# chrome-cpu-profiler

Visulise your applications performance in chrome using flame-graphs!

## Installation

    npm install --save chrome-cpu-profiler

## Usage

    profiler.startProfiling('cpu-block')
    var data = profiler.stopProfiling('cpu-block')
    profiler.writeFile(data)

## Credits
Built by Tom Gallacher [@tomgco](http://twitter.com/tomgco).

## Licence
Licensed under the [New BSD License](http://opensource.org/licenses/bsd-license.php)
