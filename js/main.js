$(function () {
	$('.preloader').hide()

	$('select').selectric();

	$('.navigation').on('change', function () {
		var selectValue = $('.navigation').val();
		var $results = $('.article-list')
		$results.empty()
		$('.preloader').show()

		var url = 'https://api.nytimes.com/svc/topstories/v2/' + selectValue + '.json'
		url += '?' + $.param({
			'api-key': '1f62158a878743f7a7cb556178d0130a',
		});
		console.log(url);
		$.ajax({
				url: url,
				method: 'GET',
			})

			.done(function (data) {
				$('.preloader').hide()
				$results = $('.article-list')
				var articleInfo = ''
				var filteredArray = data.results.filter(function (result) {
					return result.multimedia.length >= 5;
				}).slice(0, 12)
				$.each(filteredArray, function (key, value) {
					var articleContent = value.abstract
					var articlePic = '<img src=' + value.multimedia[4].url + '>'
					var articleLink = value.url
					articleInfo += '<li><a href=' + articleLink + ' target="_blank">'
					articleInfo += '<p>' + articleContent + '</p>'
					articleInfo += articlePic
					articleInfo += '</a></li>'
				});

				// Layout styling when articles append
				$('.menu-wrapper').toggleClass('menu-wrapper menu-change');
				$('.nav-wrapper').toggleClass('nav-wrapper nav-change');
				$('.copyright').toggleClass('copyright copyright-change');
				$results.append(articleInfo).slideDown('slow');
			}).fail(function () {
				$('.preloader').hide()
				$results.append('Sorry! There was a problem, please try again.');
			});
	})
})