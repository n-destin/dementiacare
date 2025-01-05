import React, { useEffect, useState } from "react";
import { ZegoExpressEngine } from "zego-express-engine-webrtc";

const Conference = ({startcall}) => {
  const appId = 258335370;
  const serverSecret = "652af4182bcf8a97b00a5edc9bb6467f";
  const token = "04AAAAAGd8Q0oADIhiP3eiaMTlFdieOwCt8qUsptcDNQFeEDu4dvekLHdVoew5ZfhqSn9PdzDHaJrwaknHSv62Yu1cxXDaMEBhVCtlE/r/ectqvrIktHb+E/SOqjrJk/ZSwFwL9u466mOLLgZgHOxNHxe4xHe7+V/LGfJvw7FzWNihuje892+7bT8/s6dgJqLE+CCAOuMyIslMvMK4XlSc6pN+MsCqhJKZhzNk97Z9MiVykq8PkANfKP+ryk9A81CShRj5w2wB"
  const roomId = "roomTwo";
  const username = "username";
  const userId = "123";
  const [isCallStarted, setIsCallStarted] = useState(false);

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
        videoElement.className = "rounded rounded w-full h-102 object-fill";
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

                // Add Tailwind CSS classes
                videoElement.className = "rounded w-full h-64 object-cover";

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

  const handleStartCall = () => {
    setIsCallStarted(true);
    initializeCall();
  };

  useEffect(()=>{
    if(startcall) {
        handleStartCall()
      }
  })

  return (
    <div className="w-full h-5/6 bg-white mt-1 rounded text-black">
    <div id="local-stream" className="border-gray-300"></div>
    </div>
  );
};

export default Conference;
