/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Ensures each feed has a URL defined
         * and that the URL is not empty.
         */
        it('have URLs', function() {
            allFeeds.forEach(feed => {
                expect(feed.url).toBeDefined();
                expect(typeof feed.url).toBe('string');
                expect(feed.url).not.toBe('');
            });
        });


        /* Ensures each feed has a name defined
         * and that the name is not empty.
         */
        it('have names', function() {
            allFeeds.forEach(feed => {
                expect(feed.name).toBeDefined();
                expect(typeof feed.name).toBe('string');
                expect(feed.name).not.toBe('');
            });
        });
    });


    describe('The Menu', function() {
        const body = $('body'),
              menuIcon = $('.menu-icon-link');

        /* Ensures the menu element is
         * hidden by default.
         */
        it('is hidden by default', function() {
            expect(body.hasClass('menu-hidden')).toBe(true);
        });

        /* Ensures the menu changes
         * visibility when the menu icon is clicked.
         */
        it('changes visibility on icon click', function() {
            // We click once...
            menuIcon.click();
            expect(body.hasClass('menu-hidden')).toBe(false);

            // Then we click again, and...
            menuIcon.click();
            expect(body.hasClass('menu-hidden')).toBe(true);
        });
    });



    describe('Initial Entries', function() {
        /* Ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('are loaded asynchronously', function(done) {
            expect($('.feed .entry').length).toBeGreaterThan(0);
            done();
        });
    });



    describe('New Feed Selection', function() {
        /* Ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        let oldContent, newContent;

        beforeEach(function(done) {
            // Load the initial feed and pass another loadFeed in a callback.
            loadFeed(0, function() {
                // Save initial feed content.
                oldContent = $('.feed').html();
                // Load another feed.
                loadFeed(1, done);
            });
        });

        it('changes content', function(done) {
            newContent = $('.feed').html();

            expect(newContent).not.toBe(oldContent);
            done();
        });
    });
}());
