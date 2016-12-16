liveblogMarketplace
    .controller('MpProducerController', ['$scope', '$sce', 'api', '$routeParams',
        function($scope, $sce, api, $routeParams) {
            var iframeAttrs = [
                'width="100%"',
                'height="715"',
                'frameborder="0"',
                'allowfullscreen'
            ].join(' ');

            $scope.states = [
                { text: 'Active Blogs' },
                { text: 'Archived Blogs' }
            ];

            $scope.embedModal = false;
            $scope.active = 'preview';

            $scope.openEmbedModal = function(blog) {
                $scope.embedModal = true;
                $scope.currentBlog = blog;
            };

            api.get('/producers/' + $routeParams.id + '/blogs')
            //api.get('/marketplace/marketers/' + $routeParams.id + '/blogs')
                .then(function(data) {
                    console.log('data', data);
                    //$scope.marketer = data.marketer;

                    $scope.blogs = {
                        _items: data._items.map(function(item) {
                            return angular.extend(item, {
                                embed: '<iframe '+iframeAttrs+' src="'+item.public_url+'"></iframe>',
                                public_url: $sce.trustAsResourceUrl(item.public_url)
                            });
                        })
                    };

                    console.log('blogs', $scope.blogs);
                });
        }]);
