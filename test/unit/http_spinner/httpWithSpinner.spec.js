'use strict';

describe('httpWithSpinner', () => {
    var httpWithSpinner;
    var $http;
    var $modal;
    var sandbox;
    var closeModalStub;
    var finallyCallback;

    beforeEach(() => {
        angular.module('QMetric.test', []).service('$modal', () => ({
            open: () => {}
        }));
    });

    beforeEach(module('QMetric.httpWithSpinner'));

    beforeEach(() => {
        inject((_httpWithSpinner_, _$http_, _$modal_) => {
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

    afterEach(() => {
        sandbox.restore();
    });

    var testHttpMethod = (methodName) => {
        describe(methodName, () => {
            it('should display a spinner overlay just before initializing a request', () => {
                sandbox.spy($http, methodName);
                httpWithSpinner[methodName]();
                expect($modal.open).to.have.been.called;
                expect($http[methodName]).to.have.been.called;
            });

            it('should close a spinner overlay once the request returns', () => {
                sandbox.stub($http, methodName).returns({
                    'finally': (callback) => finallyCallback = callback
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
