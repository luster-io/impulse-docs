(function() {
  var headerEl = document.querySelector('.pullMe')
  var headerEl2 = document.querySelector('.pullMe.second')

  var header = new Impulse(headerEl)
    .style('translate', function(x, y) { return x + 'px,' + y + 'px'})

  var header2 = new Impulse(headerEl2)
    .style('translate', function(x, y) { return x + 'px,' + y + 'px'})


  var headerDrag = header.drag({ handle: headerEl })
  var headerDrag2 = header2.drag({ handle: headerEl2 })

  var dragging = false;

  headerDrag.on('start', function(){
    dragging = true;
  })

  headerDrag2.on('start', function(){
    dragging = true;
  })

  headerDrag.on('end', function(){
    header.spring({ tension: 100, damping: 10 }).to(0, 0).start().then(function(){dragging = false})
  })

  headerDrag2.on('end', function(){
    header2.spring({ tension: 100, damping: 10 }).to(0, 0).start().then(function(){dragging = false})
  })


  var physicsEl = document.querySelector('.bounce')
  var physicsHeader = new Impulse(physicsEl)
    .style('translate', function(x, y)  { return x + 'px,' + y + 'px'})

  var bounce = function() {
    if (!dragging)
      physicsHeader.spring().velocity(0, -250).from(0, 0).to(0, 0).start()
  }

  bounce()

  setInterval(bounce, 5000)
})()