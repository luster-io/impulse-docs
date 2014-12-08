### Impulse(els)<a id="impulse-constructor" class="anchor"></a>

  Initializes a new `impulse` object with a single element or
an array-like collection of elements (jQuery, NodeList, etc).

```javascript
var menu = Impulse($('.myMenu'))
var scroller = Impulse(document.getElementById('myScroller'))
```

NOTE: Now `menu` and `scroller` are instances of `inpulse`, so you can use the
methods below

### Impulse(renderFn)

  Initializes a new physics object with a render function.  Whenever
there is a change in the state of the physics object, the render function
will be called.

  NOTE: This will be called more often than you actually want to draw to
the page, so make sure your renderer debounces the updates.

```javascript
var custom = Impulse(function(x, y) {
  //pass the position to your favorite JS library
})
```

### impulse.style(property, valueFn)<a id="impulse-style" class="anchor"></a>


  Sets the css property in the first argument to the value returned by the function
in the second, every time the physics object's position changes. (This happens for every
element in the constructor.) If you set a custom render function in the
constructor this method doesn't do anything, since you're manually rendering
yourself.

  The first two arguments to `valueFn` are the `x` and `y` coordinates of the
impulse object. The third argument is the index of the element in the list of
elements you passed in.  This function is called once for each element in the
list.

```javascript
impulse.style('translate', function(x, y, index) {
  return x + 'px, ' + y + 'px';
})
```

### impulse.style(cssObj)

  Style can also be an object of the style `{ cssProperty: valueFn,
anotherProp: anotherValFn }`.

```javascript
impulse.style({
  translate: function(x, y, index){return x + 'px, ' + y + 'px'},
  opacity: function(x) { return x / 1000 },
})
```

### impulse.position(x, y)<a id="impulse-position" class="anchor"></a>

  Sets the current position of the physics object.  Returns an object with
`x` and `y` properties.

NOTE: This does not affect the position of a running animation or
interaction.

```javascript
  impulse.position(50, 50)
```

### impulse.position()

  Gets the current position of the physics object.  Returns an object with
`x` and `y` properties.

```javascript
  impulse.position(50, 50)
  var position = impulse.position() // { x: 50, y: 50 }
```

### impulse.velocity(x, y)<a id="impulse-velocity" class="anchor"></a>

  Set's the velocity of the object.  Useful for launching animations
that don't flow from the user's movement (e.g. a tap that causes a menu to open).

NOTE: This does not affect the velocity of a running animation or
interaction.

### impulse.velocity()

  Get's the current velocity of the object, if an animation is running, this
will be the current velocity from the animation.

### impulse.spring(options)<a id="impulse-spring" class="anchor"></a>

####Options:
  * **tension:** the spring's tension (default: 100)
  * **damping:** the springs damping (default: 10)

  Springs from `from` position to `to` position at current `velocity`.
Returns an `Animation`.

```javascript
var animation = impulse.spring({ tension: 100, damping: 10 })
```

### phys.accelerate(options)<a id="impulse-accelerate" class="anchor"></a>

####Options:
  * **bounce:** (default: true)
  * **restitution:** amount to damp the velocity on each bounce
  * **minBounceHeight:** Minimum height for the object to bounce (default: 100)
  * **acceleration:** How fast to accelerate. Object `{ x, y }` or `scalar` (default: 1000)

  Accelerates from `from` position to `to` position starting at current `velocity`.
Returns an `Animation`.  Acceleration can be a scalar, which will be transformed into
a vector in the direction of `from` to `to` with a magnitute of `acceleration`.
It can also be an object `{ x, y }`.  Note, if you use the object form, if the vector
does not intersect with the `x` or `y` value in from, it will animate forever.

### phys.deccelerate(options)<a id="impulse-decelerate" class="anchor"></a>

####Options:
  * **deceleration:** How fast to decelerate(default: 1000)

  Decelerates from `from` position to `to` position at current `velocity`.
Returns an `Animation`.

## impulse.interact(options)<a id="impulse-interact" class="anchor"></a>

####Options:
  * **boundry:** the boundry of where the object is allowed to be moved. (default: none)
  * **damping:** how much to damp the movement by when it is outside the boundry. (default: 0)

  If you want to allow a user to interact with a physics object, i.e. drag it
around.This will update the renderer with the position set by interact, and
will record the final velocity.

```javascript
impulse.interact({})
```

## impulse.drag()<a id="impulse-drag" class="anchor"></a>

####Options:
  * **boundry:** the boundry of where the object is allowed to be moved. (default: none)
  * **damping:** how much to damp the movement by when it is outside the boundry. (default: 0)

  Allows a user to drag a physics object.  Automatically calculates `velocity`.


## impulse.attachSpring(attachment, opts)<a id="impulse-attach-spring" class="anchor"></a>

  The `attachSpring` method works differently from other animation methods, in
  that it is constantly running, and responds to updates to the position of
  it's `attachment`.

####Options:
  * **tension:** the spring's tension (default: 100)
  * **damping:** the springs damping (default: 10)
  * **seperation:** distance to maintain from attachment, if closer than `seperation` it will spring
  away, if further away it will spring towards it.
  * **offset:** { x, y } offset from attachment's position

  `attachment` can be another physics object, or it can be a function that will return a position { x, y } when called.

  Attaches a spring to a physics object or function `attachment`. If
`attachment` is a function, it should return a set of `{ x, y }` coordinates.
of the thing you are attaching to.

  Returns an `attachedSpring`, whose position and velocity can be updated as
the animation is running.

```javascript
var attachedSpring = phys.attachSpring(attachment, opts)
```
## impulse.direction(direction)<a id="impulse-direction" class="anchor"></a>

  Pass in a string, `"up" "down" "left" "right"` will return true
if moving in that direction, and false otherwise.

  Impulse objects with `0` velocity will neither be moving up nor down.

####Options:
  * **tension:** the spring's tension (default: 100)
  * **damping:** the springs damping (default: 10)
  * **seperation:** distance to maintain from attachment, if closer than `seperation` it will spring
  away, if further away it will spring towards it.
  * **offset:** { x, y } offset from attachment's position

  `attachment` can be another physics object, or it can be a function that will return a position { x, y } when called.

  Attaches a spring to a physics object or function `attachment`. If
`attachment` is a function, it should return a set of `{ x, y }` coordinates.
of the thing you are attaching to.

  Returns an `attachedSpring`, whose position and velocity can be updated as
the animation is running.

```javascript
var attachedSpring = phys.attachSpring(attachment, opts)
```
##Animation

###animation.to(x, y)<a id="animation-to" class="anchor"></a>

   This sets the position that the animation is moving towards.  This defaults to
the current position of the physics object.

```javascript
impulse.spring().to(50, 50).start()
```

###animation.from(x, y)<a id="animation-from" class="anchor"></a>

   This sets the position that the animation starts at.  This defaults to
the current position of the physics object.

```javascript
impulse.spring().from(0, 0).start()
```

###animation.velocity(x, y)<a id="animation-velocity" class="anchor"></a>

  This sets the initial velocity for the animation.If not set, the velocity
  defaults to the current velocity of the physics object.

```javascript
impulse.accelerate().velocity(1000, 1000).start()
```

###animation.start()<a id="animation-start" class="anchor"></a>

   Starts the animation running.  This will cancel any other animations or
interactions running on this impulse object. This method is bound to the
`animation`, so you can conveniently pass it around without having to manually
bind it (e.g. to a promise).

```javascript
impulse.accelerate().start()
  .then(impulse.spring().start)
```

##Drag

###drag.on('start|end|move', callback)<a id="drag-on" class="anchor"></a>

  Listen for `start`, `end`, or `move` events.

###drag.moved()<a id="drag-moved" class="anchor"></a>

  Returns whether the user actually moved during the drag.

##Interaction

###interaction.start()<a id="interaction-start" class="anchor"></a>

  Starts the interaction, returns a promise that will fulfill when end is called
or reject when the interaction is cancelled.

###interaction.start(event)

  Starts the interaction with an input event (touch, mouse).  Calls to `update`
will move the object relative to this starting point.

```javascript
var interaction = impulse.interact()
interaction.start()
```

###interaction.position(x, y)<a id="interaction-position" class="anchor"></a>

  Updates the position of the physics object.  This position, along with the time it occured will be used to calculate the velocity of the physics object.

```javascript
var interaction = impulse.interact()
interaction.start()
interaction.position(50, 50)
```

###interaction.end()<a id="interaction-end" class="anchor"></a>

  Ends the interaction.You can do this on touchend.Returns a promise fulfilled
with the final state of the interaction.

```javascript
var interaction = impulse.interact()
interaction.start()
//later
interaction.end()
```

##AttachedSpring

###attachedSpring.stop()<a id="attached-spring-stop" class="anchor"></a>

  Stops the spring from running.

```javascript
spring.stop()
```

###attachedSpring.position()<a id="attached-spring-position" class="anchor"></a>

  Returns the current {x, y} of the spring

```javascript
var position = spring.position()
```

###attachedSpring.position(x, y)

  Updates the position of the spring.  If the spring is running, this will
affect the simulation.

```javascript
spring.position(100, 100)
```

###attachedSpring.velocity(x, y)<a id="attached-spring-velocity" class="anchor"></a>

  Updates the velocity of the spring in flight.If the spring is running, this
  will affect the simulation.

```javascript
spring.velocity(50, 50)
```
