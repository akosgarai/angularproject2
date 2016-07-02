describe('Example module Unit Tests', function () {
    beforeEach(module('invoiceCollector'));

    var $controller;
    
    beforeEach(inject(function(_$controller_) {
        $controller = _$controller_;
    }));

    describe('TEST001 - sample test name', function () {
        it('it describes the sample test', function () {
            var $scope = {};
            var controller = $controller('invoiceCollectorController', { '$scope' : $scope});
            var expected = [{
            }];
            $scope.expected = expected;
            expect($scope.expected).toEqual(expected); 
        }); 
    });
    describe('TEST002 - Initialization of main objects (initialization controller)', function () {
        it('it checks the $scope.init() function', function () {
            var $scope = {};
            var controller = $controller('invoiceCollectorInitializationController', { '$scope' : $scope});
            var expectedProviders = [
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
            var expectedInvoices = [
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
                }
            ];
            $scope.init();
            expect([$scope.invoiceProviders, $scope.invoices]).toEqual([expectedProviders, expectedInvoices]);
        }); 
    });
    describe('TEST003 - Initialization of main objects (invoice collertor controller)', function () {
        it('it checks the $scope.init() function', function () {
            var $scope = {};
            var controller = $controller('invoiceCollectorController', { '$scope' : $scope});
            var expected = [
                ''
            ];
            $scope.init();
            expect([$scope.selectedProvider]).toEqual(expected); 
        }); 
    });
    describe('TEST004 - invoiceCollectorController related tests', function () {
        beforeEach(function () {
            $scope = {};
            controller = $controller('invoiceCollectorInitializationController', { '$scope' : $scope});
            $scope.invoiceProviders = [];
            $scope.init();
            controller = $controller('invoiceCollectorController', { '$scope' : $scope});
            $scope.init();
        });
        it('it checks the change handler function of providers', function () {
            var expected = [
                1
            ];
            $scope.setSelectedProvider(1);
            expect([$scope.invoiceObject['selectedProviderId']]).toEqual(expected); 
        }); 
        it('checking the getInvoiceProviderById fn. - try to find an existing id, so it should return invoiceProvider object', function () {
            var expected = {
                'id' : 3,
                'label': 'Provider 3',
                'details' : [
                    {'value' : 'detail-value-1', 'label' : 'detail-label-1'},
                    {'value' : 'detail-value-2', 'label' : 'detail-label-2'},
                    {'value' : 'detail-value-3', 'label' : 'detail-label-3'}
                ]
            };
            var ip = $scope.getInvoiceProviderById(3);
            expect(ip).toEqual(expected);
        });
        it('checking the getInvoiceProviderById fn. - try to find an invalid id, so it should return empty object', function () {
            var expected = {};
            var ip = $scope.getInvoiceProviderById(5);
            expect(ip).toEqual(expected);
        });
        it('checking the updateSelectedProvider fn. - update with NULL, so it sets the selectedP* vars. to default value', function () {
            var expected = ['', ''];
            $scope.updateSelectedProvider();
            expect([$scope.selectedProvider, $scope.invoiceObject['selectedProviderId']]).toEqual(expected);
        });
        it('checking the updateSelectedProvider fn. - update with providerId: 3, so it sets the selectedProvider. to provider(id:3)', function () {
            var expected = {
                'id' : 3,
                'label': 'Provider 3',
                'details' : [
                    {'value' : 'detail-value-1', 'label' : 'detail-label-1'},
                    {'value' : 'detail-value-2', 'label' : 'detail-label-2'},
                    {'value' : 'detail-value-3', 'label' : 'detail-label-3'}
                ]
            };
            $scope.updateSelectedProvider(3);
            expect($scope.selectedProvider).toEqual(expected);
        });
    });
    describe('TESTMENU - Menu related functions menu controller', function () {
        it('it checks the $scope.init() function', function () {
            var $scope = {};
            var controller = $controller('invoiceCollectorController', { '$scope' : $scope});
            var expected = [
                ''
            ];
            $scope.init();
            expect([$scope.selectedProvider]).toEqual(expected); 
        }); 
    });
});
