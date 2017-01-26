$(function () {
	$('.navigation').on('change', function () {
		var selectValue = $('.navigation').val();
		// console.log(selectValue)
		var url = 'https://api.nytimes.com/svc/topstories/v2/' + selectValue + '.json'
		// console.log(url)
		url += '?' + $.param({
			'api-key': '1f62158a878743f7a7cb556178d0130a'
		});
		$.ajax({
			url: url,
			method: 'GET',
		}).done(function (data) {
			console.log(data);
			$.each(data.results, function(key, value) {
				if(value.multimedia.length > 0) {
				console.log(value.multimedia.length)
			} 
				// $('.article-list').append(<img src=' + value.artworkUrl100 + '>);

			})
		}).fail(function (err) {
			throw err;
		});
	})
})