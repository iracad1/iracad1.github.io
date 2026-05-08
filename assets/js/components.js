var siteName = 'iracad Consulting & Design';

(function() {
	var header = [
		'<header id="header">',
		'  <h1><a href="index.html">iracad</a></h1>',
		'  <nav class="links">',
		'    <ul>',
		'      <li><a href="index.html">Home</a></li>',
		'      <li><a href="about.html">About</a></li>',
		'      <li><a href="contact.html">Contact</a></li>',
		'    </ul>',
		'  </nav>',
		'  <nav class="main">',
		'    <ul>',
		'      <li class="search">',
		'        <a class="fa-search" href="#search">Search</a>',
		'        <form id="search" method="get" action="#">',
		'          <input type="text" name="query" placeholder="Search" />',
		'        </form>',
		'      </li>',
		'      <li class="menu">',
		'        <a class="fa-bars" href="#menu">Menu</a>',
		'      </li>',
		'    </ul>',
		'  </nav>',
		'</header>',

		'<section id="menu">',
		'  <section>',
		'    <form class="search" method="get" action="#">',
		'      <input type="text" name="query" placeholder="Search" />',
		'    </form>',
		'  </section>',
		'  <section>',
		'    <ul class="links">',
		'      <li><a href="index.html"><h3>Home</h3><p>Back to the main page</p></a></li>',
		'      <li><a href="about.html"><h3>About</h3><p>Learn more about this site</p></a></li>',
		'      <li><a href="contact.html"><h3>Contact</h3><p>Get in touch</p></a></li>',
		'    </ul>',
		'  </section>',
		'  <section>',
		'    <ul class="actions stacked">',
		'      <li><a href="#" class="button large fit">Log In</a></li>',
		'    </ul>',
		'  </section>',
		'</section>'
	].join('\n');

	var el = document.getElementById('site-header');
	if (el) el.outerHTML = header;

	var pageTitle = document.title.trim();
	document.title = pageTitle ? pageTitle + ' - ' + siteName : siteName;
})();
