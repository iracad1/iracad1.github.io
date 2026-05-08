/*
	Future Imperfect by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$menu = $('#menu'),
		$sidebar = $('#sidebar'),
		$main = $('#main');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ null,      '480px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Menu.
		$menu
			.appendTo($body)
			.panel({
				delay: 500,
				hideOnClick: true,
				hideOnSwipe: true,
				resetScroll: true,
				resetForms: true,
				side: 'right',
				target: $body,
				visibleClass: 'is-menu-visible'
			});

	// Search (header).
		var $search = $('#search'),
			$search_input = $search.find('input');

		$body
			.on('click', '[href="#search"]', function(event) {

				event.preventDefault();

				// Not visible?
					if (!$search.hasClass('visible')) {

						// Reset form.
							$search[0].reset();

						// Show.
							$search.addClass('visible');

						// Focus input.
							$search_input.focus();

					}

			});

		$search_input
			.on('keydown', function(event) {

				if (event.keyCode == 27)
					$search_input.blur();

			})
			.on('blur', function() {
				window.setTimeout(function() {
					$search.removeClass('visible');
				}, 100);
			});

	// Intro.
		var $intro = $('#intro');

		// Move to main on <=large, back to sidebar on >large.
			breakpoints.on('<=large', function() {
				$intro.prependTo($main);
			});

			breakpoints.on('>large', function() {
				$intro.prependTo($sidebar);
			});

	// Format an ISO date string (YYYY-MM-DD) to a readable display date.
		function formatDate(iso) {
			var d = new Date(iso + 'T00:00:00');
			return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
		}

	// Render posts from posts.js data.
		(function() {
			var $pagination = $main.find('ul.pagination');
			posts.forEach(function(post, index) {
				var link = 'single.html?post=' + index;
				var subtitleHtml = post.subtitle ? '<p>' + post.subtitle + '</p>' : '';
				var imageHtml = post.image
					? '<a href="' + link + '" class="image featured"><img src="' + post.image + '" alt="" /></a>'
					: '';

				var $article = $([
					'<article class="post">',
					'  <header>',
					'    <div class="title">',
					'      <h2><a href="' + link + '">' + post.title + '</a></h2>',
					       subtitleHtml,
					'    </div>',
					'    <div class="meta">',
					'      <time class="published" datetime="' + post.date + '">' + formatDate(post.date) + '</time>',
					'    </div>',
					'  </header>',
					   imageHtml,
					'  <p>' + post.excerpt + '</p>',
					'  <footer>',
					'    <ul class="actions"><li><a href="' + link + '" class="button large">Continue Reading</a></li></ul>',
					'  </footer>',
					'</article>'
				].join('\n'));

				$article.insertBefore($pagination);
			});
		})();

	// Pagination.
		var postsPerPage = 3;
		var currentPage = 1;
		var $posts = $main.find('article.post');
		var $prevBtn = $('#prev-page');
		var $nextBtn = $('#next-page');
		var $pageNumbers = $('#page-numbers');

		function showPage(page) {
			var totalPages = Math.ceil($posts.length / postsPerPage);
			var start = (page - 1) * postsPerPage;
			var end = start + postsPerPage;

			$posts.each(function(i) {
				if (i >= start && i < end)
					$(this).show();
				else
					$(this).hide();
			});

			$prevBtn.toggleClass('disabled', page <= 1);
			$nextBtn.toggleClass('disabled', page >= totalPages);

			$pageNumbers.empty();
			for (var i = 1; i <= totalPages; i++) {
				var $btn = $('<a href="#" class="button">' + i + '</a>');
				if (i === page) $btn.addClass('active');
				$btn.on('click', (function(p) {
					return function(e) {
						e.preventDefault();
						showPage(p);
						window.scrollTo(0, 0);
					};
				})(i));
				$pageNumbers.append($btn);
			}

			currentPage = page;
		}

		if ($posts.length > 0) {
			showPage(1);

			$prevBtn.on('click', function(e) {
				e.preventDefault();
				if (currentPage > 1) {
					showPage(currentPage - 1);
					window.scrollTo(0, 0);
				}
			});

			$nextBtn.on('click', function(e) {
				e.preventDefault();
				var totalPages = Math.ceil($posts.length / postsPerPage);
				if (currentPage < totalPages) {
					showPage(currentPage + 1);
					window.scrollTo(0, 0);
				}
			});
		}

})(jQuery);