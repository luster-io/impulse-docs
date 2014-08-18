#Impulse

  Create animations that flow naturally from the user's movements.

  Rather than animating properties for a set amount of time, impulse takes a
start position, end position, and velocity.

##example

```
var impulse = Impulse(el)
  .style('translate', function(x, y) { return x + 'px, ' + y + 'px' })

impulse.position(0, 0)

impulse.spring({ tension: 100, damping: 10 })
  .to(100, 100).start()
```

More examples can be found [here](impulse.luster.io/examples.html)

##High Level Explanation

  Calling impulse on an element or set of elements returns an impulse object.
An impulse object maintains it's own position and velocity.  You can interact
with a PhysicsObject (drag, pan, etc), and animate it.  Animations take the
current position and velocity of the PhysicsObject as a starting point, and
animate to a user defined position.

  For example a user can drag an element around.  Once they're done dragging,
the next animation will start from the position and velocity that they left off.
Making the animation feel like a natural extension of their movement.

##LICENSE
MIT -- Read LICENCE
