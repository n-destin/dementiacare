// import { sendMessage } from "../app";

// let localStream; 
// let remoteStream;
// let peerConnection;



// export async function getLocalMedia(){
//     try {
//         const constrains = {
//             audio : true, 
//             video : true
//         }
//         const stream = await navigator.mediaDevices.getUserMedia(constrains)
//         localStream = stream
//         return stream;
//     } catch (error) {
//         console.error("Error accessing media devices", error);
//         throw error;
//     }
// }

// export function createPeerConnection(configurations = {}){
//     peerConnection = new RTCPeerConnection(configurations)
//     peerConnection.onicecandidate = (event) => {
//         if(event.candidate){
//             sendMessageToServer({
//                 type: "candidate", 
//                 candidate : event.candidate
//             })
//         }
//     }

//     peerConnection.ontrack = (event) =>{
//         if(!remoteStream){
//             remoteStream = new MediaStream();
//         }
//         remoteStream.addTrack(event.track)
//     }

//     if (localStream){
//         localStream.getTracks().forEach((track)=>{
//             peerConnection.addTrack(track, localStream)
//         })
//     }
// }

// export async function createOffer() {
//     try {
//         const offer = await peerConnection.createOffer();
//         await peerConnection.setLocalDescription(offer)
//         sendMessageToServer({
//             type: 'offer', 
//             offer : peerConnection.setLocalDescription
//         })
//     } catch (error) {
//         console.error('Error creating offer', error)
//     }
// }

// export async function handleOffer(offer){
//     if(!peerConnection){
//         createPeerConnection();
//     }
//     peerConnection.setRemoteDescription(new RTCSessionDescription(offer))
//     const answer = await peerConnection.createAnswer();
//     await peerConnection.setLocalDescription(answer)

//     sendMessageToServer({
//         type : 'answer', 
//         answer : peerConnection.setLocalDescription
//     })
// }


// export async function handleAnswer(answer) {
//     try {
//       if (!peerConnection) {
//         createPeerConnection(); // Ensure we have a peerConnection
//       }
//       await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
//     } catch (error) {
//       console.error('Error setting remote description', error);
//     }
//   }

//   export async function handleCandidate(candidate) {
//     try {
//       if (!peerConnection) {
//         createPeerConnection(); // Ensure we have a peerConnection
//       }
//       await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
//     } catch (error) {
//       console.error('Error adding received ICE candidate', error);
//     }
//   }

//   async function makeCall() {
//     const configuration = {'iceServers': [{'urls': 'stun:stun.l.google.com:19302'}]}
//     const peerConnection = new RTCPeerConnection(configuration);
//     const offer = await peerConnection.createOffer();
//     await peerConnection.setLocalDescription(offer);
//     sendMessage('offer', offer) // create offer
// }


//   export async function initCall() {
//     await getLocalMedia();
//     makeCall();
//     await createOffer();
//   }