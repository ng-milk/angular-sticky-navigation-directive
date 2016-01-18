/*
 * angular-sticky-navigation-directive v0.0.7
 * (c) 2015 Dan Mindru <http://mindrudan.com>
 * License: MIT
 *
 *
 * Thanks for contributions:
 * - Luciano Lattes <https://github.com/llattes>
 */

angular.module('dm.stickyNav', [])
       .directive('stickyNav', stickyNavDirective);

//Inject $window, $timeout & document so we won't have a bad time during uglyfication.
stickyNavDirective.$inject = ['$window', '$timeout', '$document'];

function stickyNavDirective($window, $timeout, $document){
  function stickyNavLink(scope, element, attrs){
    var w = angular.element($window),
        size = 0,
        top = 0,
        defaultStickyClass = 'ng-sticky-fixed',
        stickyClass = (attrs.stickyNav || defaultStickyClass),
        ignoreElementSize = (typeof attrs.ignoreElementSize !== 'undefined');

    /*
     * On scroll we just check the page offset
     * if it's bigger than the target size we fix the controls
     * otherwise we display them inline
     */
    function toggleStickyNav(){
      // Do not add class if the sticky element is bigger than the document.
      var docHeight = Math.max($document[0].documentElement["clientHeight"],
        $document[0].body["scrollHeight"],
        $document[0].documentElement["scrollHeight"],
        $document[0].body["offsetHeight"],
        $document[0].documentElement["offsetHeight"]);

      if((top + size) >= docHeight){
        element.removeClass(stickyClass);
        return;
      }

      if(!element.hasClass(stickyClass) && $window.pageYOffset > (top + (size * (ignoreElementSize ? 0 : 1)))){
        element.addClass(stickyClass);
      } else if(element.hasClass(stickyClass) && $window.pageYOffset <= (top + (size * (ignoreElementSize ? 0 : 1)))){
        element.removeClass(stickyClass);
      }
    }

    /*
     * Function with retries to set the 'top' & 'size' values when DOM is ready.
     */
    function setInitialValues(tries){
      // A sanity check, just in case we reuse this function as a handler.
      if(isNaN(+tries)){
        tries = attrs.maxTries || 0;
      }

      if(tries >= 0){
        $timeout(function(){
          var topValue = element[0].getBoundingClientRect().top + $window.pageYOffset;
          var elHeight = element[0].clientHeight;
          if(topValue > 0 || elHeight > 0){
            top = topValue;
            size = elHeight;
          } else {
            setInitialValues(tries - 1);
          }
        }, attrs.msRetryDelay || 100);
      }
    }

    (function activate() {
      setInitialValues();

      /*
     * We update the top position -> this is for initial page load,
     * while elements load
     */
      scope.$watch(function(){
        return element[0].getBoundingClientRect().top + $window.pageYOffset;
      }, function(newValue, oldValue){
        if(newValue !== oldValue && !element.hasClass(stickyClass)){
          top = newValue;
        }
      });

    /*
     * We update the size -> this is for initial page load,
     * while elements load
     */
      scope.$watch(function(){
        return element[0].clientHeight;
      }, function(newValue, oldValue){
        if(newValue !== oldValue && !element.hasClass(stickyClass)){
          size = newValue;
        }
      });

      /*
       * Resizing the window displays the controls inline by default.
       * This is needed to calculate the correct boundingClientRect.
       * After the top is updated we toggle the nav, eventually
       * fixing the controls again if needed.
       */
      w.bind('resize', function stickyNavResize(){
        element.removeClass(stickyClass);
        top = element[0].getBoundingClientRect().top + $window.pageYOffset;
        toggleStickyNav();
      });
      w.bind('scroll', toggleStickyNav);
    })();
  }

  return {
    scope: {},
    restrict: 'A',
    link: stickyNavLink
  };
}
