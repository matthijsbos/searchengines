define(['bootstrap', 'plugins/router', 'durandal/app', 'knockout'], function (_, router, app, ko) {
    var ShellViewModel = function() {
        var self = this;
        self.router = router;
        self.activate = function () {
            router.map([
                { route: '', title:'Home', moduleId: 'viewmodels/home', nav: true },
                { route: '', title:'Search results', moduleId: 'viewmodels/results', nav: true },
            ]).buildNavigationModel();
            
            return router.activate();
        };
    };

    return new ShellViewModel();
});
