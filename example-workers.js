h5
.worker('/example/worker.js')
.send(data)
.error(function(event) {
  console.error(event.message + " in " + event.filename + " at line " + event.lineno);
  event.preventDefault();
});
.receive(function(data) {
  console.log(data);
})
.abort();

// Inside the Worker
importScripts("core.h5ive.js", "worker.h5ive.js");

h5
.worker(self)
.receive(function(data) {
  var sqrt;
  console.log(data);
  sqrt = Math.sqrt(data);

  console.log(h5.worker(self) === this);
  this.send(sqrt);
  this.__raw__.postMessage(sqrt);
});

