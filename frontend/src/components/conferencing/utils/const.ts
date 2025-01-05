// =====================================================================
// 1. Getting local media stream
// =====================================================================
let localStream;             // Will hold the local media stream
let remoteStream;            // Will hold the remote media stream
let peerConnection;          // Will be the RTCPeerConnection object

/**
 * @function getLocalMedia
 * @description Obtains the user's camera and microphone via getUserMedia.
 * @returns {Promise<MediaStream>}
 */


async function getLocalMedia() {
  try {
    const constraints = {
      audio: true,
      video: true,
    };
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    localStream = stream;
    return stream;
  } catch (error) {
    console.error('Error accessing media devices.', error);
    throw error;
  }
}

// =====================================================================
// 2. Creating and setting up the RTCPeerConnection
// =====================================================================
/**
 * @function createPeerConnection
 * @description Creates an RTCPeerConnection and sets up ICE/track handlers.
 * @param {Object} config - Optional configuration object for PeerConnection.
 */
function createPeerConnection(config = {}) {
  peerConnection = new RTCPeerConnection(config);
  // Handle new ICE candidates
  peerConnection.onicecandidate = (event) => {
    if (event.candidate) {
      // Send the ICE candidate to the remote peer via signaling
      sendMessageToServer({
        type: 'candidate',
        candidate: event.candidate,
      });
    }
  };

  // When a remote stream arrives, attach it to a <video> element or store it
  peerConnection.ontrack = (event) => {
    // event.streams is an array of MediaStream objects
    if (!remoteStream) {
      remoteStream = new MediaStream();
    }
    remoteStream.addTrack(event.track);
    // Here you could, for instance, link it to a video element
    // remoteVideo.srcObject = remoteStream;
  };

  // Add local tracks (audio & video) to the PeerConnection
  if (localStream) {
    localStream.getTracks().forEach((track) => {
      peerConnection.addTrack(track, localStream);
    });
  }
}

// =====================================================================
// 3. Creating and handling WebRTC offers/answers
// =====================================================================
/**
 * @function createOffer
 * @description Creates and sends an SDP offer to the remote peer.
 */
async function createOffer() {
  try {
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    // Send the offer to the remote peer via signaling
    sendMessageToServer({
      type: 'offer',
      offer: peerConnection.localDescription,
    });
  } catch (error) {
    console.error('Error creating offer', error);
  }
}

/**
 * @function handleOffer
 * @description Receives and handles an SDP offer from a remote peer.
 * @param {RTCSessionDescriptionInit} offer
 */
async function handleOffer(offer) {
  try {
    if (!peerConnection) {
      createPeerConnection(); // Ensure we have a peerConnection
    }
    await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));

    // Create an answer to the received offer
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);

    // Send the answer to the remote peer
    sendMessageToServer({
      type: 'answer',
      answer: peerConnection.localDescription,
    });
  } catch (error) {
    console.error('Error handling offer', error);
  }
}

/**
 * @function handleAnswer
 * @description Receives and handles an SDP answer from a remote peer.
 * @param {RTCSessionDescriptionInit} answer
 */
async function handleAnswer(answer) {
  try {
    if (!peerConnection) {
      createPeerConnection(); // Ensure we have a peerConnection
    }
    await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
  } catch (error) {
    console.error('Error setting remote description', error);
  }
}

// =====================================================================
// 4. Handling ICE candidates
// =====================================================================
/**
 * @function handleCandidate
 * @description Adds an ICE candidate received from the remote peer.
 * @param {RTCIceCandidateInit} candidate
 */
async function handleCandidate(candidate) {
  try {
    if (!peerConnection) {
      createPeerConnection(); // Ensure we have a peerConnection
    }
    await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
  } catch (error) {
    console.error('Error adding received ICE candidate', error);
  }
}

// =====================================================================
// 5. Signaling Message Handlers (Example)
// =====================================================================
/**
 * @function onMessageFromServer
 * @description Example function that handles incoming messages from the server.
 * @param {Object} message
 */
function onMessageFromServer(message) {
  switch (message.type) {
    case 'offer':
      handleOffer(message.offer);
      break;
    case 'answer':
      handleAnswer(message.answer);
      break;
    case 'candidate':
      handleCandidate(message.candidate);
      break;
    default:
      console.warn('Unknown message type:', message.type);
      break;
  }
}

// =====================================================================
// 6. Utility function to send messages to the server
// =====================================================================
/**
 * @function sendMessageToServer
 * @description Placeholder function for sending data to your signaling server.
 * @param {Object} message
 */
function sendMessageToServer(message) {
  // In an actual application, this might use WebSockets, Socket.IO, etc.
  console.log('Sending to server:', message);
}

// =====================================================================
// 7. Example initialization flow
// =====================================================================
async function initCall() {
  // 1. Get local media
  await getLocalMedia();

  // 2. Create PeerConnection
  createPeerConnection();

  // 3. (Optionally) create and send an offer if you are the caller
  await createOffer();
}
