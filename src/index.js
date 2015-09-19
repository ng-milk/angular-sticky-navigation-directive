/*
 * angular-sticky-navigation-directive v0.0.5
 * (c) 2015 Dan Mindru http://mindrudan.com
 * License: MIT
 */

angular.module('dm.stickyNav', [])
       .directive('stickyNav', stickyNavDirective);

//Inject $window so we won't have a bad time during uglyfication.
stickyNavDirective.$inject = ['$window'];
function stickyNavDirective($window){
  function stickyNavLink(scope, element, attrs){
    var w = angular.element($window),
        size = element[0].clientHeight,
        top = 0,
        defaultStickyClass = 'ng-sticky-fixed',
        stickyClass = attrs.stickyNav || defaultStickyClass;

    /*
     * On scroll we just check the page offset
     * if it's bigger than the target size we fix the controls
     * otherwise we display them inline
     */
    function toggleStickyNav(){
      if(!element.hasClass(stickyClass) && $window.pageYOffset > top + size){
        element.addClass(stickyClass);
      } else if(element.hasClass(stickyClass) && $window.pageYOffset <= top + size){
        element.removeClass(stickyClass);
      }
    }

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
  }

  return {
    scope: {},
    restrict: 'A',
    link: stickyNavLink
  };
}