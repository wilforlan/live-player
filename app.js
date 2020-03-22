// var manifestUri =
    // 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4';
function initApp() {
  // Install built-in polyfills to patch browser incompatibilities.
  shaka.polyfill.installAll();

  // Check to see if the browser supports the basic APIs Shaka needs.
  if (shaka.Player.isBrowserSupported()) {
    // Everything looks good!
    // initPlayer();
    console.log("Everything Looks Good!!!")
  } else {
    // This browser does not have the minimum set of APIs we need.
    console.error('Browser not supported!');
  }
}

function startPlaying() {
    let videoLink = document.getElementById("videoLinkInput").value;
    initPlayer(videoLink);
}
function initPlayer(manifestUri) {
  // Create a Player instance.
  let element = null
  if(manifestUri.includes('.mp3')) { element = document.getElementById('audio'); document.getElementById('video').style.display = 'none' }
  else { element = document.getElementById('video'); document.getElementById('audio').style.display = 'none' }
  // var element = document.getElementById('audio');
  element.style.display = 'block'
  var player = new shaka.Player(element);

  // Attach player to the window to make it easy to access in the JS console.
  window.player = player;

  // Listen for error events.
  player.addEventListener('error', onErrorEvent);

  // Try to load a manifest.
  // This is an asynchronous process.
  player.load(manifestUri).then(function() {
    // This runs if the asynchronous load is successful.
    console.log('The video has now been loaded!');
  }).catch(onError);  // onError is executed if the asynchronous load fails.
}

function onErrorEvent(event) {
  // Extract the shaka.util.Error object from the event.
  onError(event.detail);
}

function onError(error) {
  // Log the error.
  console.error('Error code', error.code, 'object', error);
}

document.addEventListener('DOMContentLoaded', initApp);