function main()
{
	// Define video & thumbnail HTML element classes
	var videoClasses = '.html5-video-container';
	var thumbnailClasses = '.yt-uix-simple-thumb-wrap, .yt-thumb img, .ytp-thumbnail-overlay, .pl-header-thumb';

    // Add transition for the blur effect
    $(thumbnailClasses).css('-webkit-transition','-webkit-filter ease-in-out 0.35s');

    // Get enabled flag
    chrome.storage.local.get('enabled', function(result)
    {
        // Extension enabled?
        if ( result.enabled == false )
        {
            // Hide HTML5 video player element
            $(videoClasses).show();

            // Un-do blur
            $(thumbnailClasses).css('-webkit-filter', 'none');

            // Stop execution
            return;
        }

        // Hide HTML5 video player element
        $(videoClasses).hide();

        // Blur out thumbnails
        $(thumbnailClasses).css('-webkit-filter', 'blur(5px)');
    });
}

// Ugly hack
// TODO: Find a cleaner way to do this
setInterval(main, 100);