/*
 * angular-sticky-navigation-directive v0.0.2
 * (c) 2015 Dan Mindru http://mindrudan.com
 * License: MIT
 */

angular.module('dm.stickyNav', [])
       .directive('sticky-nav', stickyNavDirective);

stickyNavDirective.$inject = ['$window'];
function stickyNavDirective($window){
  function stickyNavLink(scope, element){
    var w = angular.element($window),
        size = element[0].clientHeight,
        top = 0;

    /*
     * On scroll we just check the page offset
     * if it's bigger than the target size we fix the controls
     * otherwise we display them inline
     */
    function toggleStickyNav(){
      if(!element.hasClass('controls-fixed') && $window.pageYOffset > top + size){
        element.addClass('controls-fixed');
      } else if(element.hasClass('controls-fixed') && $window.pageYOffset <= top + size){
        element.removeClass('controls-fixed');
      }
    }

    /*
     * We update the top position -> this is for initial page load,
     * while elements load
     */
    scope.$watch(function(){
      return element[0].getBoundingClientRect().top + $window.pageYOffset;
    }, function(newValue, oldValue){
      if(newValue !== oldValue && !element.hasClass('controls-fixed')){
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
      element.removeClass('controls-fixed');
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