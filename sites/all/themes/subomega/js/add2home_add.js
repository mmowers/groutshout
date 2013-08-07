//details at http://cubiq.org/add-to-home-screen
var addToHomeConfig = {
    autostart: true,			// Automatically open the balloon
    returningVisitor: true,	// Show the balloon to returning visitors only (setting this to true is HIGHLY RECCOMENDED)
    animationIn: 'bubble',		// drop || bubble || fade
    animationOut: 'drop',		// drop || bubble || fade
    startDelay: 500,			// 2 seconds from page load before the balloon appears
    lifespan: 4000,			// 15 seconds before it is automatically destroyed
    bottomOffset: 14,			// Distance of the balloon from bottom
    expire: 10,					// Minutes to wait before showing the popup again (0 = always displayed)
    message: 'Install this web app on your %device: tap %icon and then <strong>Add to Home Screen</strong>.',				// Customize your message or force a language ('' = automatic)
    touchIcon: false,			// Display the touch icon
    arrow: true,				// Display the balloon arrow
    hookOnLoad: true,			// Should we hook to onload event? (really advanced usage)
    closeButton: true			// Let the user close the balloon
};