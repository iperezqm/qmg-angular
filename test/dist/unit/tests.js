'use strict';

describe('httpWithSpinner', function () {
    var httpWithSpinner;
    var $http;
    var $modal;
    var sandbox;
    var closeModalStub;
    var finallyCallback;

    beforeEach(function () {
        inject(function (_httpWithSpinner_, _$http_, _$modal_) {
            httpWithSpinner = _httpWithSpinner_;
            $http = _$http_;
            $modal = _$modal_;
        });

        sandbox = sinon.sandbox.create();
        closeModalStub = sandbox.stub();

        sandbox.stub($modal, 'open').returns({
            close: closeModalStub
        });
    });

    afterEach(function () {
        sandbox.restore();
    });

    var testHttpMethod = function testHttpMethod(methodName) {
        describe(methodName, function () {
            it('should display a spinner overlay just before initializing a request', function () {
                sandbox.spy($http, methodName);
                httpWithSpinner[methodName]();
                expect($modal.open).to.have.been.called;
                expect($http[methodName]).to.have.been.called;
            });

            it('should close a spinner overlay once the request returns', function () {
                sandbox.stub($http, methodName).returns({
                    'finally': function _finally(callback) {
                        return finallyCallback = callback;
                    }
                });
                httpWithSpinner[methodName]();
                finallyCallback();
                expect(closeModalStub).to.have.been.called;
            });
        });
    };

    testHttpMethod('get');
    testHttpMethod('post');
});
//

'use strict';

describe('qmgTrack directive', function () {
    var $compile;
    var scope;

    var compileWithAttributes = function compileWithAttributes(attributes) {
        var element = $compile('<div ' + attributes + '></div>')(scope);
        scope.$digest();
        return element;
    };

    beforeEach(function () {
        angular.module('QMetric.oneAccount.config', []);

        module('QMetric.tracking');

        inject(function (_$compile_, $rootScope) {
            $compile = _$compile_;
            scope = $rootScope.$new();
        });
    });

    it('should remove qmg-track attribute', function () {
        var element = compileWithAttributes('qmg-track');

        expect(element.attr('qmg-track')).to.be.undefined;
    });

    it('should add analytics-on attribute', function () {
        var element = compileWithAttributes('qmg-track');

        expect(element.attr('analytics-on')).to.equal('');
    });

    it('should track non-default events', function () {
        var element = compileWithAttributes('qmg-track="\'click\'"');

        expect(element.attr('analytics-event')).to.equal('click');
    });

    it('should define tracking event labels', function () {
        var element = compileWithAttributes('qmg-track qmg-event-label="\'thisIsTheLabel\'"');

        expect(element.attr('qmg-event-label')).to.be.undefined;
        expect(element.attr('analytics-label')).to.equal('thisIsTheLabel');
    });

    it('should read qmg-tracking-category from closest parent element', function () {
        var parentElement = $compile('<div qmg-tracking-category="\'parentCategory\'"><div qmg-tracking-category="\'inheritedCategory\'"><p qmg-track></p></div></div>')(scope);
        var element = parentElement.find('p');
        scope.$digest();
        expect(element.attr('analytics-category')).to.equal('inheritedCategory');
    });
});
//

//# sourceMappingURL=tests.js.map