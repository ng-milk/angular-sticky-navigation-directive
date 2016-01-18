# Angular sticky navigation directive
![Angular sticky navigation directive demo](http://cdn.makeagif.com/media/9-14-2015/D7S9Ra.gif)


### [Quick Demo](http://ng-milk.github.io/angular-sticky-navigation-directive/)
Angular directive to make a sticky element, read about it on [here](https://ngmilk.rocks/2015/04/09/angularjs-sticky-navigation-directive/).
It will add a `ng-sticky-fixed` class whenever your navigation is not visible on the viewport (therefore it will make it visible & sticky).
It's up to you to style the class properly, see the example for more.


## Usage
1. Include `ng-sticky.js`.
2. Add `dm.stickyNav` as a dependency to your app.
3. Profit!


## Bower
Installable via `bower`:

```bash
bower install ng-sticky
```

## Example
See [index.html](https://github.com/ng-milk/angular-sticky-navigation-directive/blob/master/index.html) for an example.

```html
<script>
  angular.module('app', ['dm.stickyNav']);
</script>

<style>
  .ng-sticky-fixed{
    background-color:rgba(0, 0, 0, 0.1);
    bottom:0;
    left:0;
    padding:10px 15px;
    position:fixed;
    top:auto;
    width:100%;
  }
</style>

<article ng-app="app">
  <section sticky-nav>
    <button class="btn btn-primary">Review</button>
    <button class="btn btn-danger">Delete</button>
  </section>

  <section>
    [...] Lots of text
  </section>
</article>
```

## Custom sticky class
By default `ng-sticky-fixed` will be appended to the element's class. By providing a value to the `sticky-nav` attribute you can use any other class:

```html
[...]
<style>
  .custom-class{
    /* ... */
  }
</style>

<article ng-app="app">
  <section sticky-nav="custom-class">
    [...]
  </section>
  [...]
</article>
```
## Additional directive attributes
By default, the directive will attempt a 100 milliseconds $timeout call to wait for the DOM to load. You can provide different values for retrying until DOM is ready using `max-tries` and `ms-retry-delay`:

```html
<div sticky-nav="custom-class" max-tries="5" ms-retry-delay="200"/>
```
When you don't want to use the height of your sticky element as part of the threshold for applying the sticky class, you can add the `ignore-element-size` directive attribute. It is useful for 'tall' elements like sidebars or side menus.

```html
<div sticky-nav="custom-class" ignore-element-size/>
```

## About ngmilk
<img src="http://ngmilk.rocks/content/images/2014/10/111-1.jpg" width="200px"/>

**ngmilk** is the place to go for fresh front-end articles, with a focus on AngularJS.
See more on [ngmilk.rocks](https://ngmilk.rocks)

Follow [@ngmilkrocks](http://twitter.com/ngmilkrocks) on Twitter to stay ahead of the game.

