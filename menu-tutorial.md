Pull Down Menu
==============

<p data-height="564" data-theme-id="8002" data-slug-hash="nmewI" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/xcoderzach/pen/nmewI/'>Pull Down Menu</a> by Zach Smith (<a href='http://codepen.io/xcoderzach'>@xcoderzach</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

  One of the easiest things to build with luster physics is a pull down menu.
We'll build a pulldown menu that accelerates as if it were being pulled down
by gravity and bounces when it hits the bottom. When it's closing it will
act as if it's being pulled up by a spring.

  Let's start by creating some markup for our menu.

```markup
<body>
  <div class="nav-header">
    <div class="hamburger-menu-handle"></div>
  </div>
  <div class="pull-down-menu">
    <div class="close-handle">close</div>
  </div>
</div>
```

  We have the menu itself `.pull-down-menu`, and then we have a top nav bar
`.nav-header` with a hamburger menu icon `.hamburger-menu-handle` (three
bars), which when clicked or dragged, will open and close the menu.

  Add some basic css. Don't worry about this - the important thing is that it creates a menu that
is the full height and width of the viewport and shifts it off screen, above
the viewport.

  We'll start off by creating a physics object for the menu. Since the menu is
going to be vertical, we only need to add css to animate along the y axis.

```javascript
  var menu = new Physics(menuEl)
    .style('translateY', function(position) { return position.y + 'px' })
```

  What this does is, as the position of the menu changes, (being dragged,
accelerated, or sprung), we update the css `transform: translateY` property, to the
current y position.

  Next we'll create a boundry for where we want the menu to be dragged.
 This prevents the menu from being pulled past the bottom of the screen.

```javascript
  var boundry = Physics.Boundry({ top: 0, bottom: window.innerHeight })
```

  Now, to build to the actual interaction, we start off by making the menu
draggable within our boundry.  We specify `handles`, which are the elements
that the user interacts with to drag the menu.  In this case, that's the hamburger
menu, and the `close` bar on the bottom.

```javascript
var drag = menu.drag({ handle: handleEls, boundry: boundry })
```

  In the background, Luster Physics takes the users actions and uses them to move
the menu and calculate the velocity of the user's movement.

  If you run this code right now, you can pull the menu open by dragging
the hambuger menu, but once you let go it just sticks.  The next step is
to create an animation that flows from the user's movement.

```javascript
function end() {
  if(drag.moved()) {
    isOpen = menu.direction('down')
  } else {
    isOpen = !isOpen
  }

  if(isOpen) {
    menu.accelerate({ acceleration: 1500, bounce: true })
      .to(0, boundry.bottom).start()
  } else {
    menu.spring({ tension: 100, damping: 15 })
      .to(0, boundry.top).start()
  }
}

drag.on('end', end)
```

  The end function we've defined here checks if the user actually moved while
dragging.  If they moved the menu, we determine whether to open or close the
menu based on whether the menu is currently moving up or down.  If they
didn't move at all (i.e. they tapped it), we just toggle the open state of the
menu.  Once we know if the menu is opening or closing, we either accelerate to the
bottom, or spring to the top.

  Annnnndd we're done! You can access the [full code here](https://github.com/luster-io/demo-pull-down-menu/blob/master/app/scripts/app.js), or play with the codePen.

  When you're building something with Impulse, you'll want to play around with the
numerical parameters (tension, damping, acceleration, etc) so that the interaction
matches the unique feeling of your app.  This might take a bit of experimentation, but
you'll get a really unique feeling for your interactions.

  The last thing you may want to do is only bounce when the user swiped the
menu icon. If the user tapped, you should give her a no frills, down to
business animation.
