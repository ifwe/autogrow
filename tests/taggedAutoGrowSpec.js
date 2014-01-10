/*jshint expr: true*/
define(['src/taggedAutogrow', 'angular/mocks'], function() {
  describe('Module: tagged.directives.autogrow', function() {
    var ORIGINAL_HEIGHT = '30px';
    var ORIGINAL_WIDTH = '100px';

    beforeEach(module('tagged.directives.autogrow'));

    beforeEach(inject(function($rootScope, $compile, $document, $timeout) {
      this.elem = angular.element('<textarea ng-model="test" tagged-autogrow></textarea>');
      this.elem.css({
        height: ORIGINAL_HEIGHT,
        width: ORIGINAL_WIDTH,
        padding: 0,
        border: 0
      });

      // Tests won't pass unless the textarea is added to the document.
      // This is required so that offsetHeight and offsetWidth will be calculated properly.
      $document.find('body').append(this.elem);

      this.scope = $rootScope.$new();
      this.compile = $compile;
      this.document = $document;
      this.timeout = $timeout;
    }));

    afterEach(function() {
      this.elem.remove();
    });

    it('keeps original height if only one line of text', function() {
      this.compile(this.elem)(this.scope);
      this.elem.css('height').should.equal(ORIGINAL_HEIGHT);
      this.scope.test = 'test';
      this.scope.$apply();
      this.timeout.flush();
      this.elem.css('height').should.equal(ORIGINAL_HEIGHT);
    });

    // TODO - These tests fail in Phantom for some reason
    xit('increases height as text value grows', function() {
      this.compile(this.elem)(this.scope);
      this.elem.css('height').should.equal(ORIGINAL_HEIGHT);
      this.scope.test = 'test\ntest';
      this.scope.$apply();
      this.timeout.flush();
      this.elem.css('height').should.equal('36px');
    });
    xit('reduces height as text value shrinks', function() {
      this.compile(this.elem)(this.scope);
      this.elem.css('height').should.equal(ORIGINAL_HEIGHT);
      this.scope.test = 'test\ntest';
      this.scope.$apply();
      this.timeout.flush();
      this.elem.css('height').should.equal('36px');
      this.scope.test = 'test';
      this.scope.$apply();
      this.elem.css('height').should.equal(ORIGINAL_HEIGHT);
    });
  });
});
