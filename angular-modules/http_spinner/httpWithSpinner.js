'use strict';

angular.module('QMetric.httpWithSpinner', []).service('httpWithSpinner', ($http, $modal) => {
    var displaySpinner = () => $modal.open({
        template: '<i class="fa fa-spinner fa-pulse"></i>',
        backdrop: 'static'
    });

    return {
        get: (url, config) => {
            var modal = displaySpinner();
            var getPromise = $http.get(url, config);
            getPromise.finally(() => modal.close());
            return getPromise;
        },
        post: (url, data, config) => {
            var modal = displaySpinner();
            var postPromise = $http.post(url, data, config);
            postPromise.finally(() => modal.close());
            return postPromise;
        }
    };
});
