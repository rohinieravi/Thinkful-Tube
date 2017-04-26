var YOUTUBE_URL = 'https://www.googleapis.com/youtube/v3/search';
var nextPageToken = '';
var prevPageToken = '';

function getDataFromYoutubeAPI(searchTerm, nextPage, callback) {
	var searchQuery = {
		part: 'snippet',
		key: 'AIzaSyAAUrPyU25F3SdEF6I7O0RG6Bx6gGL5hV4',
		q: searchTerm,
		pageToken: nextPage
	};
	$.getJSON(YOUTUBE_URL, searchQuery, callback);
}

function displaySearchResults(data) {
	var results = '';
	if(data.nextPageToken) {
		$('.js-next-page').attr('disabled',false);
		nextPageToken = data.nextPageToken;
	}
	else {
		$('.js-next-page').attr('disabled',true);
		nextPageToken = '';
	}
	if(data.prevPageToken) {
		$('.js-prev-page').attr('disabled',false);
		prevPageToken = data.prevPageToken;
	}
	else {
		$('.js-prev-page').attr('disabled', true);
		prevPageToken = '';
	}
	if (data.pageInfo.totalResults) {
		$('.prevnext').removeClass('hidden');
		data.items.forEach( function(item) {
			results += '<div><iframe width="560" height="315"  src="https://www.youtube.com/embed/' + item.id.videoId + '" frameborder="0" allowfullscreen></iframe><a href="https://www.youtube.com/channel/' + item.snippet.channelId + '/videos" target="_blank">More videos from channel</a></div>';
		});
	}
	else {
		alert('here');
		results = '<p>No results</p>';
	}
	$('.js-search-results').html(results);
}

$('.js-search-form').submit( function(event) {
	event.preventDefault();
	var query = $(this).find('.js-query').val();
	getDataFromYoutubeAPI(query, '', displaySearchResults);
});

$('.js-next-page').click( function(event) {
	event.preventDefault();
	var query = $('.js-query').val();
	getDataFromYoutubeAPI(query, nextPageToken, displaySearchResults);
});

$('.js-prev-page').click( function(event) {
	event.preventDefault();
	var query = $('.js-query').val();
	getDataFromYoutubeAPI(query, prevPageToken, displaySearchResults);
});