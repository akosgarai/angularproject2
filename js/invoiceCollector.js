angular.module('invoiceCollector', [])
.controller('invoiceCollectorController', ['$scope', function ($scope) {
    $scope.init = function () {
        $scope.selectedProviderId = '';
        $scope.selectedProvider = '';
        $scope.invoiceObject = {
            'selectedProviderId': '',
            'arriveDate' : new Date($scope.getTodayString()),
            'validDate' : new Date($scope.getTodayString()),
            'payedDate' : new Date($scope.getTodayString()),
            'invoiceId' : '',
            'amount' : ''
        };
    };
/*
 * http://stackoverflow.com/questions/1531093/how-to-get-current-date-in-javascript
 * */    
    $scope.getTodayString = function () {
        var today = new Date();
        return $scope.getDateString(today);
    };
    $scope.getToday = function () {
        return new Date();
    };
    $scope.setSelectedProvider = function (providerId) {
        $scope.invoiceObject['selectedProviderId'] = providerId;
    };
    $scope.updateSelectedProvider = function (p) {
        if(!p) {
            $scope.init();
        } else {
            $scope.setSelectedProvider(p);
            $scope.selectedProvider = $scope.getInvoiceProviderById($scope.invoiceObject['selectedProviderId']);
        }
    };
}]).controller('invoiceCollectorInitializationController', ['$scope', function ($scope) {
    $scope.init = function () {
        $scope.invoices = [
            {
                'providerId': '1',
                'arriveDate' : new Date('2016-01-10'),
                'validDate' : new Date('2016-01-20'),
                'payedDate' : new Date('2016-01-19'),
                'invoiceId' : 'testinvoiceid1',
                'amount' : '6500'
            },
            {
                'providerId': '2',
                'arriveDate' : new Date('2016-01-09'),
                'validDate' : new Date('2016-01-22'),
                'payedDate' : new Date('2016-01-21'),
                'invoiceId' : 'testinvoiceid2',
                'amount' : '7000'
            },
            {
                'providerId': '3',
                'arriveDate' : new Date('2016-01-04'),
                'validDate' : new Date('2016-01-17'),
                'payedDate' : new Date('2016-01-11'),
                'invoiceId' : 'testinvoiceid3',
                'amount' : '7500'
            },
            {
                'providerId': '1',
                'arriveDate' : new Date('2016-02-10'),
                'validDate' : new Date('2016-02-20'),
                'payedDate' : new Date('2016-02-19'),
                'invoiceId' : 'testinvoiceid1',
                'amount' : '6505'
            },
            {
                'providerId': '2',
                'arriveDate' : new Date('2016-02-09'),
                'validDate' : new Date('2016-02-22'),
                'payedDate' : new Date('2016-02-21'),
                'invoiceId' : 'testinvoiceid2',
                'amount' : '7005'
            },
            {
                'providerId': '3',
                'arriveDate' : new Date('2016-02-04'),
                'validDate' : new Date('2016-02-17'),
                'payedDate' : new Date('2016-02-11'),
                'invoiceId' : 'testinvoiceid3',
                'amount' : '7505'
            },
            {
                'providerId': '1',
                'arriveDate' : new Date('2016-06-10'),
                'validDate' : new Date('2016-06-20'),
                'payedDate' : '',
                'invoiceId' : 'testinvoiceid1',
                'amount' : '6505'
            },
            {
                'providerId': '2',
                'arriveDate' : new Date('2016-06-19'),
                'validDate' : new Date('2016-07-05'),
                'payedDate' : '',
                'invoiceId' : 'testinvoiceid2',
                'amount' : '7005'
            },
            {
                'providerId': '3',
                'arriveDate' : new Date('2016-07-01'),
                'validDate' : new Date('2016-07-17'),
                'payedDate' : '',
                'invoiceId' : 'testinvoiceid3',
                'amount' : '7505'
            }
        ];
        $scope.invoiceProviders = [
            {
                'id' : 1,
                'label': 'Provider 1',
                'details' : [
                    {'value' : 'detail-value-1', 'label' : 'detail-label-1'},
                    {'value' : 'detail-value-2', 'label' : 'detail-label-2'},
                    {'value' : 'detail-value-3', 'label' : 'detail-label-3'}
                ]
            },
            {
                'id' : 2,
                'label': 'Provider 2',
                'details' : [
                    {'value' : 'detail-value-1', 'label' : 'detail-label-1'},
                    {'value' : 'detail-value-2', 'label' : 'detail-label-2'},
                    {'value' : 'detail-value-3', 'label' : 'detail-label-3'}
                ]
            },
            {
                'id' : 3,
                'label': 'Provider 3',
                'details' : [
                    {'value' : 'detail-value-1', 'label' : 'detail-label-1'},
                    {'value' : 'detail-value-2', 'label' : 'detail-label-2'},
                    {'value' : 'detail-value-3', 'label' : 'detail-label-3'}
                ]
            }
        ];
    };
    $scope.getInvoiceProviderById = function (id) {
        for (var e in $scope.invoiceProviders) {
            if ($scope.invoiceProviders[e]['id'] == id) {
                return $scope.invoiceProviders[e];
            }
        }
        return {};
    };
    $scope.getDateString = function (dateObject) {
        if (dateObject == '') {
            return '';
        }
        var year = dateObject.getFullYear();
        var month = dateObject.getMonth() +1;
        if (month < 10) {
            month = '0'+month;
        }
        var day = dateObject.getDate();
        if (day < 10) {
            day = '0'+day;
        }
        return year+'-'+month+'-'+day;
    };
}]).controller('invoiceCollectorNavigationController', ['$scope', function ($scope) {
    $scope.app = 'listInvoice';

    $scope.setApp = function (appName) {
        $scope.app = appName;
    };
}]).controller('invoiceListController', ['$scope', '$filter', function ($scope, $filter) {
    $scope.orderObject = {
        'name' : 'arriveDate',
        'reverse' : 'true',
        'filter' : {
            'datefilter' : '',
            'providerfilter' : ''
        }
    };
    $scope.setFilterName = function (name, type) {
        $scope.orderObject['filter'][type] = name;
    };
    $scope.setOrderObject = function (name) {
        if (name == $scope.orderObject['name']) {
            $scope.orderObject['reverse'] = !$scope.orderObject['reverse'];
        } else {
            $scope.orderObject['name'] = name;
            $scope.orderObject['reverse'] = true;
        }
    };
    $scope.showDangerLabel = function (date) {
        var today = new Date();
        if (date < today) {
            return true;
        }
        return false;
    };
}]).filter('nameFilter', function () {
    return function (items, id) {
        if (!id || id == '') {
            return items;
        }
        var matchedItems = [];
        for (var i in items) {
            if (parseInt(items[i]['providerId']) == id) {
                matchedItems.push(items[i]);
            }
        }
        return matchedItems;
    };
}).filter('dateFilter', function () {
    return function (items, filterType) {
        var matchedItems = [];
        if (filterType == 'unpayed') {
            for (var i in items) {
                if (items[i]['payedDate'] == '') {
                    matchedItems.push(items[i]);
                }
            }
            return matchedItems;
        }
        if (filterType == 'payed') {
            for (var i in items) {
                if (items[i]['payedDate'] != '') {
                    matchedItems.push(items[i]);
                }
            }
            return matchedItems;
        }
        return items;
    };
});

