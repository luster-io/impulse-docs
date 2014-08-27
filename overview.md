#Overview<a class="anchor" id="overview"></a>
  Impulse is a library for building dynamic physics based interactions,
with a focus on mobile web.

How is this different from jquery animate, velocity.js, etc?
---------------------------------------------------------

  Most animation libraries animate from one state to another over a fixed
period of time.  If you want non-linear movement you pass in an easing
function, which modifies the original path in the same way every time.

  Impulse takes a different approach.  Instead of a duration, Impulse instead
takes an initial velocity, and simulates the animation based on that.  This
small change produces a different experience.  Instead of static animations
that feel awkward and stiff, Impulse animations feel smooth and fluid.

  Animations flow smoothly from user interactions.  When a user swipes an
element, it moves at the velocity of their swipe.

How is this different from famo.us?
-----------------------------------

  Famo.us is a huge framework that tries to do everything for you. It tries to
do away with the browser's layout engine, in favor of converting everything
into a hardware accelerated render layer and controlling everything itself.
Impulse is a much small library that provides physics based animations and
interactions.

Why not CSS Animations?
-----------------------

  CSS animations and transitions are a great for creating simple, static
animations.  However, when you're building animations with multiple steps,
involving multiple elements, or that need to react dynamically to a users
motion, CSS animations become very unweildy.

  Impulse doesn't generate CSS animations on the fly, because there is a long
delay (> 200ms) between when the animation is generated, and when the animation
beings playing.


