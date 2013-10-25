define(['knockout', 'jquery', 'jqcloud'], function(ko, $, _) {
    var HomeViewModel = function() {
        var self = this;
        self.search = ko.observable('');
        self.searching = ko.observable(false);
	self.page = ko.observable(1);
	self.pageCount = ko.observable(4);
        self.searchButtonClicked = function() {
            self.results([]);
            self.searching(true);
//	    $.ajax({ url: 'http://localhost:8983/solr/collection1/select',
//	          data: { 'q': self.search(), 'wt': 'json' },
//		     success: function(data) {
//			alert(data);	
//	},
//		    datatype: 'jsonp',
//		    jsonp: 'json.wrf'
//	    });
		$.getJSON('/search',
			  {'q': self.search() || '*', 'wt':'json', 'wt': 'json', 'rows': '10' },
			  function(data) {
				self.results(data.response.docs);
				self.searching(false);
				self.page(1);
				var c = data.response.numFound / data.responseHeader.params.rows;
				c = Math.ceil(c);
				self.pageCount(c);
			  });

		setTimeout(function() {

                var drawCharts = function() {
                    $('canvas').each(function() {
                        $(this).width($(this).parent().width())
                               .attr('width', $(this).parent().width());
                    });
                    var ctx = document.getElementById('pieChart').getContext('2d');
                    var pieData = [{value: 345, color: '#1240AB'},
                                   {value: 234, color: '#4671D5'},
                                   {value: 133, color: '#6C8CD5'},
                                   {value: 34,  color: '#2A4480'},
                                   {value: 44,  color: '#06266F'}]
                    var pieChart = new Chart(ctx).Doughnut(pieData, { animationSteps: 50 });

                    var ctx = document.getElementById('lineChart').getContext('2d');
                    var lineData = {
                        labels: ['1980', '', '', '', '', '', '', '', '', '', '1990', '', '', '', '', '', '', '', '', '', '2000', '', '', '', '', '', '', '', '', '', '2010', '', '', ''], 
                        datasets: [
                            {
                                fillColor: '#4671D5',
                                strokeColor: '#2A4480',
                                data: [4, 6, 7, 8, 3, 2, 5, 6, 9, 12, 3, 4, 5, 6, 7, 22, 3, 5, 4, 7, 4, 5, 4, 7, 8, 9, 1, 9, 34, 45, 44, 33, 22, 11]
                            }
                        ]
                    };
                    var lineOptions = {
                        pointDot: false,
                        datasetStrokeWidth: 2,
                        animationSteps: 20
                    };

                    var lineChart = new Chart(ctx).Line(lineData, lineOptions);
                };

                $(window).resize(function() {
                    $('canvas').each(function(){
                        if ($(this).width() != $(this).parent().width()) {
                            drawCharts();    
                            return;
                        }
                    });
                });

                drawCharts();
                
                $('.wordcloud').popover({ 
                    html: true,
                    content: function() { 
                      return '<div id="wordcloud" style="width:200px; height: 200px;"></div>';
                    }, 
                    placement: 'auto', 
                    title: 'Word cloud'
                })
                .on('shown.bs.popover', function() {  
                    var words = [
                        {text: 'teswert', weight: 19},
                        {text: 'jwz', weight: 9},
                        {text: 'blabla', weight: 24},
                        {text: 'test', weight: 13}];
                    $('#wordcloud').jQCloud(words);
                });


            }, 500);
        };
        self.results = ko.observableArray([]);
        self.displayOptions = ko.observable(false);
        self.toggleOptionsButtonClicked = function() {
            self.displayOptions(!self.displayOptions());
        };
    };
    
    return new HomeViewModel();
});
