// Browser action clicked
chrome.browserAction.onClicked.addListener(function(tab)
{
    // Get enabled flag
    chrome.storage.local.get('enabled', function(result)
    {
		// First time?
		if ( result.enabled == undefined )
		{
			result.enabled = true;
		}
		
        // Toggle enabled status
        var enabled = !result.enabled;

        // Save it using the Chrome extension storage API.
        chrome.storage.local.set({'enabled': enabled});

        // Refresh extension button
        refreshIcon(tab, enabled);
    });

    // Refresh extension button
    refreshIcon(tab);
});

// Refresh the browser action icon based on enabled/disabled state
function refreshIcon(tab, enabled)
{
    // Get enabled flag
    chrome.storage.local.get('enabled', function(result)
    {
        // Extension enabled?
        if (result.enabled || result.enabled == undefined)
        {
            chrome.browserAction.setIcon({path: "assets/img/icon48.png", tabId: tab.id});
        }
        else
        {
            chrome.browserAction.setIcon({path: "assets/img/icon48_off.png", tabId: tab.id});
        }
    });
}

// Listen for tab update event
chrome.tabs.onUpdated.addListener(function(tabId , info) 
{
    refreshIcon({ id: tabId });
});
