const appId = 258335370;
const serverSecret = "652af4182bcf8a97b00a5edc9bb6467f";
const token = "04AAAAAGeByBEADKOx+xJJzBI4v59TbgCvvjNWXVGmAJz5IpvnjHoseDMIj4Liw7cfJO4eT1aYy10Z0nta3dIGFpcggv1nI4CilGqMbKZoaP+4E2K+BNN+ZeNtbdgIygq2+kU0m3cWRR5Px7u5AI5OxmKSWpHdDS5Slxe21ZGWpea0sKxgeQzFxH3AcRCayu8wkIpA914iAt6xyswux2NzXccOV3fd5gWLP5yf1NLzMv01jfbTIyw6fLr3/d65UkBEfvhFrUuNhAE="
const roomId = "roomTwo";
const username = "username";
const userId = "123";

const initializeCall = async () => {
  try {
    const server = new ZegoExpressEngine(appId, serverSecret);
    server.setDebugVerbose(false);

    const result = await server.loginRoom(
      roomId,
      token,
      { userID: userId, userName: username },
      { userUpdate: true}
    );
    if (result) {
      console.log("User logged in to room:", roomId);
    } else {
      console.log("Login failed");
      return;
    }
    const localStream = await server.createStream({
      camera: {
        video: true,
        audio: true,
      },
    });
    const localStreamContainer = document.getElementById("local-stream");
    if (localStreamContainer) {
      localStreamContainer.innerHTML = "";
      const videoElement = document.createElement("video");
      videoElement.id = "local-video";
      videoElement.className = "h-28 w-32";
      videoElement.autoplay = true;
      videoElement.muted = true; // usually keep local video muted to avoid echo
      videoElement.playsInline = true;

      videoElement.srcObject = localStream;
      localStreamContainer.appendChild(videoElement);
    }

    const streamID = "local-" + Date.now();
    server.startPublishingStream(streamID, localStream);

    server.on(
      "roomStreamUpdate",
      async (roomId, updateType, streamList, extendedData) => {
        const remoteStreamContainer =
          document.getElementById("remote-stream");
        if (!remoteStreamContainer) return;

        if (updateType === "ADD") {
          for (let index = 0; index < streamList.length; index++) {
            const remoteStreamId = streamList[index].streamID;
            try {
              const remoteStream = await server.startPlayingStream(
                remoteStreamId,
                { audio: true, video: true }
              );
              const videoElement = document.createElement("video");
              videoElement.autoplay = true;
              videoElement.playsInline = true;
              videoElement.id = `remote-${remoteStreamId}`;
              videoElement.srcObject = remoteStream;

              remoteStreamContainer.appendChild(videoElement);
            } catch (error) {
              console.error("Error playing remote stream:", error);
            }
          }
        } else if (updateType === "DELETE") {
          const removedStreamID = streamList[0].streamID;
          server.stopPlayingStream(removedStreamID);
          const removedVideoElem = document.getElementById(
            `remote-${removedStreamID}`
          );
          removedVideoElem?.parentNode?.removeChild(removedVideoElem);
        }
      }
    );
  } catch (error) {
    console.error("Error initializing call:", error);
  }
};

export const handleStartCall = () => {
  console.log("reached here")
  initializeCall();
};