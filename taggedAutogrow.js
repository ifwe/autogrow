/*! tagged-autogrow - v1.0.3 - 2015-07-22 */
/*! tagged-autogrow - v1.0.2 - 2014-01-10 */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['angular'], factory);
  } else {
    // Browser globals
    root.taggedAutogrow = factory(root.angular);
  }
}(this, function (angular) {
  "use strict";

  /*
   * Adapted from: http://code.google.com/p/gaequery/source/browse/trunk/src/static/scripts/jquery.autogrow-textarea.js
   *
   * Works nicely with the following styles:
   * textarea {
   *  resize: none;
   *  transition: 0.05s;
   *  -moz-transition: 0.05s;
   *  -webkit-transition: 0.05s;
   *  -o-transition: 0.05s;
   * }
   *
   * Usage: <textarea ng-model="myModel" tagged-autogrow></textarea>
   */
  var module = angular.module('tagged.directives.autogrow', []);
  module.directive('taggedAutogrow', ['$window', '$document', '$timeout', function($window, $document, $timeout) {
    var $shadow = angular.element('<div></div>').css({
      position: 'absolute',
      top: '-10000px',
      left: '-10000px',
      whiteSpace: 'pre-wrap',
      wordWrap: 'break-word'
    });
    angular.element($document[0].body).append($shadow);

    return {
      require: 'ngModel',
      scope: {
        noPadding: '=?'
      },
      link: function(scope, element, attr, ctrl) {
        scope.noPadding = scope.noPadding || false;

        $timeout(function() {
          var minHeight = element[0].offsetHeight,
            styles = $window.getComputedStyle(element[0]),
            stylesToDuplicate = [
              'width', 'boxSizing', 'paddingTop', 'paddingRight',
              'paddingBottom', 'paddingLeft', 'borderTopWidth',
              'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth',
              'lineHeight', 'fontSize'
            ];

          scope.$watch(function () {
            return ctrl.$modelValue;
          }, function() {
            var newStyles = {},
              // additional text to add to the shadow element
              padding = ' oooooo',
              val,
              height;

            // Refresh styles on model change in case they have changed
            styles = $window.getComputedStyle(element[0]);
            angular.forEach(stylesToDuplicate, function(style) {
              newStyles[style] = styles[style];
            });

            $shadow.css(newStyles);
            val = element.val().replace(/\n$/g, "\n.");
            if (!scope.noPadding)
              val = val + padding;
            $shadow.text(val);
            height = Math.max($shadow[0].offsetHeight, minHeight);
            element.css('height', height + 'px');
          });
        });
      }
    };
  }]);

  return module;
}));
