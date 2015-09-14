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

<article ng-app="md.ngSticky">
  <section sticky-nav>
    <button class="btn btn-primary">Review</button>
    <button class="btn btn-danger">Delete</button>
  </section>

  <section>
    [...] Lots of text
  </section>
</article>
```

## About ngmilk
<img src="http://ngmilk.rocks/content/images/2014/10/111-1.jpg" width="200px"/>

**ngmilk** is the place to go for fresh front-end articles, with a focus on AngularJS.
See more on [ngmilk.rocks](https://ngmilk.rocks)

Follow [@ngmilkrocks](http://twitter.com/ngmilkrocks) on Twitter to stay ahead of the game.

