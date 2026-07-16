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

	// Image gallery: build browsable slideshow markup for a set of project images.
		window.buildGallery = function(images) {
			if (!images || !images.length)
				return '';

			var slides = images.map(function(src, i) {
				return '<img src="' + src + '" alt="" class="gallery-slide' + (i === 0 ? ' active' : '') + '" />';
			}).join('');

			var nav = '', dots = '';
			if (images.length > 1) {
				nav = '<a href="#" class="gallery-nav gallery-prev" aria-label="Previous photo">&#10094;</a>' +
					'<a href="#" class="gallery-nav gallery-next" aria-label="Next photo">&#10095;</a>';
				dots = '<div class="gallery-dots">' + images.map(function(_, i) {
					return '<a href="#" class="gallery-dot' + (i === 0 ? ' active' : '') + '" data-index="' + i + '"></a>';
				}).join('') + '</div>';
			}

			return '<div class="gallery"><div class="gallery-frame">' + slides + nav + '</div>' + dots + '</div>';
		};

		function galleryShow($gallery, index) {
			var $slides = $gallery.find('.gallery-slide');
			var count = $slides.length;
			index = ((index % count) + count) % count;
			$slides.removeClass('active').eq(index).addClass('active');
			$gallery.find('.gallery-dot').removeClass('active').eq(index).addClass('active');
		}

		$body.on('click', '.gallery-prev, .gallery-next', function(event) {
			event.preventDefault();
			var $gallery = $(this).closest('.gallery');
			var $slides = $gallery.find('.gallery-slide');
			var current = $slides.index($gallery.find('.gallery-slide.active'));
			galleryShow($gallery, current + ($(this).hasClass('gallery-next') ? 1 : -1));
		});

		$body.on('click', '.gallery-dot', function(event) {
			event.preventDefault();
			galleryShow($(this).closest('.gallery'), parseInt($(this).attr('data-index'), 10));
		});

	// Render posts from posts.js data.
		(function() {
			var $pagination = $main.find('ul.pagination');
			posts.forEach(function(post, index) {
				var link = 'single.html?post=' + index;
				var subtitleHtml = post.subtitle ? '<p>' + post.subtitle + '</p>' : '';
				var galleryHtml = buildGallery(post.images && post.images.length ? post.images : (post.image ? [post.image] : []));

				var $article = $([
					'<article class="post project-card">',
					'  <header>',
					'    <div class="title">',
					'      <h2><a href="' + link + '">' + post.title + '</a></h2>',
					       subtitleHtml,
					'    </div>',
					'  </header>',
					   galleryHtml,
					'  <p>' + post.excerpt + '</p>',
					'  <footer>',
					'    <ul class="actions"><li><a href="' + link + '" class="button large">Continue Reading</a></li></ul>',
					'  </footer>',
					'</article>'
				].join('\n'));

				$article.insertBefore($pagination);
			});
		})();

	// Pagination: one project per page so each is highlighted on its own.
		var postsPerPage = 1;
		var currentPage = 1;
		var $posts = $main.find('article.post');
		var $prevBtn = $('#prev-page');
		var $nextBtn = $('#next-page');
		var $pageNumbers = $('#page-numbers');

		function showPage(page, skipHash) {
			var totalPages = Math.ceil($posts.length / postsPerPage);
			var start = (page - 1) * postsPerPage;
			var end = start + postsPerPage;

			$posts.each(function(i) {
				if (i >= start && i < end)
					$(this).show();
				else
					$(this).hide();
			});

			$pageNumbers.empty();
			for (var i = 1; i <= totalPages; i++) {
				var label = (postsPerPage === 1 && typeof posts !== 'undefined' && posts[i - 1]) ? posts[i - 1].title : i;
				var $btn = $('<a href="#" class="button">' + label + '</a>');
				if (i === page) $btn.addClass('active');
				$btn.on('click', (function(p) {
					return function(e) {
						e.preventDefault();
						showPage(p);
					};
				})(i));
				$pageNumbers.append($btn);
			}

			currentPage = page;
			if (!skipHash) {
				window.location.replace('#page-' + page);

				// Scroll to the project itself (not the page top) so it is
				// immediately in view, even on phones where the intro sits above it.
				var article = $posts.eq(start)[0];
				if (article)
					article.scrollIntoView({ behavior: 'auto', block: 'start' });
			}
		}

		if ($posts.length > 0) {
			var hashMatch = window.location.hash.match(/^#page-(\d+)$/);
			var initialPage = hashMatch ? parseInt(hashMatch[1], 10) : 1;
			showPage(initialPage, true);

			// Prev/next wrap around: past the last project loops to the first and vice versa.
			$prevBtn.on('click', function(e) {
				e.preventDefault();
				var totalPages = Math.ceil($posts.length / postsPerPage);
				showPage(currentPage > 1 ? currentPage - 1 : totalPages);
			});

			$nextBtn.on('click', function(e) {
				e.preventDefault();
				var totalPages = Math.ceil($posts.length / postsPerPage);
				showPage(currentPage < totalPages ? currentPage + 1 : 1);
			});
		}

})(jQuery);