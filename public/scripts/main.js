(function() {
  var menuEl = document.querySelector('.pull-down-menu')
  var handleEls = document.querySelectorAll('.menu-handle, .close-handle')
  var boundry = new Impulse.Boundry({ top: 0, bottom: window.innerHeight, left: 0, right: 0 })
  var isOpen = false

  var menu = new Impulse(menuEl)
    .style('translateY', function(x, y) { return y + 'px' })

  var drag = menu.drag({ handle: handleEls, boundry: boundry, direction: 'vertical' })

  window.addEventListener('resize', function() {
    boundry.bottom = window.innerHeight
  })

  function end() {
    if(this.moved()) {
      isOpen = menu.direction('down')
    } else {
      isOpen = !isOpen
      if(isOpen) {
        menu.velocity(0, 2000)
      }
    }

    if(isOpen) {
      menuEl.classList.add('open')
      menu.accelerate({ acceleration: 1500, bounceAcceleration: 4000, bounce: this.moved() })
        .to(0, boundry.bottom).start()
        .then(function() {
        })
    } else {
      menuEl.classList.remove('open')
      menu.spring({ tension: 100, damping: 15 })
        .to(0, boundry.top).start()
    }
  }

  drag.on('end', end)
}())