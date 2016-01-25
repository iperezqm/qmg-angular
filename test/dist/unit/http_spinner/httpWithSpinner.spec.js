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
//# sourceMappingURL=httpWithSpinner.spec.js.map
