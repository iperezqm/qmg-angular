'use strict';

<%= generatedFileWarning %>

angular.module('QMetric.brokerWebsite.config', []);

angular.module('QMetric.brokerWebsite.config').constant('configuration', {
    serviceUrl: '<%= serviceUrl %>',
    googleTagManagerId: '<%= googleTagManagerId %>'
});
