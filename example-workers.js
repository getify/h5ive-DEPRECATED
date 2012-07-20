H5
.worker('/example/worker.js')
.send(data)
.error(function(event) {
  console.log(event.message);
  console.log(event.filename);
  console.log(event.lineno);
  event.preventDefault();
});
.receive(function(data) {
  console.log(data);
  console.log(this.__raw__.data === JSON.stringify(data));
})
.abort();
