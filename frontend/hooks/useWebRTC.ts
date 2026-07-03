"use client";

import { useRef, useState } from "react";
import { socket } from "@/services/socket/meeting.socket";

export const useWebRTC = (
  roomId: string,
  userId: string
) => {
  const peerRef =
    useRef<RTCPeerConnection | null>(
      null
    );

  const localVideoRef =
    useRef<HTMLVideoElement>(null);

  const remoteVideoRef =
    useRef<HTMLVideoElement>(null);

  const [localStream, setLocalStream] =
    useState<MediaStream | null>(null);

  const startMeeting = async () => {
    const stream =
      await navigator.mediaDevices.getUserMedia(
        {
          video: true,
          audio: true,
        }
      );

    setLocalStream(stream);

    if (localVideoRef.current) {
      localVideoRef.current.srcObject =
        stream;
    }

    const peer =
      new RTCPeerConnection({
        iceServers: [
          {
            urls: "stun:stun.l.google.com:19302",
          },
        ],
      });

    peerRef.current = peer;

    stream
      .getTracks()
      .forEach((track) =>
        peer.addTrack(track, stream)
      );

    peer.ontrack = (event) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject =
          event.streams[0];
      }
    };

    peer.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit(
          "ice-candidate",
          {
            roomId,
            candidate:
              event.candidate,
          }
        );
      }
    };

    socket.emit(
      "join-meeting",
      {
        roomId,
        userId,
      }
    );

    socket.on(
      "user-joined",
      async () => {
        const offer =
          await peer.createOffer();

        await peer.setLocalDescription(
          offer
        );

        socket.emit("offer", {
          roomId,
          offer,
        });
      }
    );

    socket.on(
      "offer",
      async (offer) => {
        await peer.setRemoteDescription(
          offer
        );

        const answer =
          await peer.createAnswer();

        await peer.setLocalDescription(
          answer
        );

        socket.emit("answer", {
          roomId,
          answer,
        });
      }
    );

    socket.on(
      "answer",
      async (answer) => {
        await peer.setRemoteDescription(
          answer
        );
      }
    );

    socket.on(
      "ice-candidate",
      async (candidate) => {
        await peer.addIceCandidate(
          candidate
        );
      }
    );
    
  };
  
  const leaveMeeting = () => {
        socket.emit(
    "leave-meeting",
    {
      roomId,
      userId,
    }
  );

  peerRef.current?.close();

  localStream
    ?.getTracks()
    .forEach(track =>
      track.stop()
    );
};
   
  const toggleMic = () => {
    if (!localStream) return;

    localStream
      .getAudioTracks()
      .forEach(
        (track) =>
          (track.enabled =
            !track.enabled)
      );
  };

  const toggleCamera = () => {
    if (!localStream) return;

    localStream
      .getVideoTracks()
      .forEach(
        (track) =>
          (track.enabled =
            !track.enabled)
      );
  };

  const shareScreen =
    async () => {
      const screenStream =
        await navigator.mediaDevices.getDisplayMedia(
          {
            video: true,
          }
        );
      
      const sender =
        peerRef.current
          ?.getSenders()
          .find(
            (s) =>
              s.track?.kind ===
              "video"
          );

      sender?.replaceTrack(
        screenStream
          .getVideoTracks()[0]
      );
    };
    
const cleanup = () => {
  socket.off("user-joined");
  socket.off("offer");
  socket.off("answer");
  socket.off("ice-candidate");
};

  return {
    startMeeting,
    localVideoRef,
    remoteVideoRef,
    toggleMic,
    toggleCamera,
    shareScreen,
    leaveMeeting,
    cleanup,
  };
};