$(function () {
	$('.navigation').on('change', function () {
		var selectValue = $('.navigation').val();
		var $results = $('.article-list')
		$results.empty()
		// console.log(selectValue)
		var url = 'https://api.nytimes.com/svc/topstories/v2/' + selectValue + '.json'
		// console.log(url)
		url += '?' + $.param({
			'api-key': '1f62158a878743f7a7cb556178d0130a',
			'callback': selectValue
		});
		// console.log(url);
		$.ajax({
			url: url,
			method: 'GET',
		}).done(function (data) {
			$results = $('.article-list')
			var articleInfo = ''
			var filteredArray = data.results.filter(function(result) {
				return result.multimedia.length >= 5;
				}).slice(0,12)
			$.each(filteredArray, function(key, value) {
				var articleContent = value.abstract
				var articlePic = '<img src=' + value.multimedia[4].url + '>'
				articleInfo += '<li>'
				articleInfo += '<p>' + articleContent + '</p>'
				articleInfo += articlePic
				articleInfo += '</li>'
			});
			console.log(filteredArray)

			// Layout styling when articles append
			$('.menu-wrapper').toggleClass('menu-change');
			$('.nav-wrapper').toggleClass('nav-change');
			$('.copyright').toggleClass('copyright-change');
			// $('.menu-wrapper').css({'height': 'auto', 'margin': '32px 0'});
			// $('img').css('width', '9.4rem');
			// $('footer').css('margin', '32px 0 55px 0');
			$results.append(articleInfo).slideDown('slow');
		}).fail(function() {
			$results.append('Sorry! There was a problem, please try again.');
		});
	})
})