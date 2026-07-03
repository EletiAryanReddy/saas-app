import { Server } from "socket.io";
import Message from "../../modules/chat/message.model";

let io: Server;

const onlineUsers = new Map<string, string>();
const meetingRooms = new Map<string, string[]>();

export const initSocket = (server: any) => {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);

    // --- Presence Status ---
    socket.on("user-online", (userId: string) => {
      onlineUsers.set(userId, socket.id);
      io.emit("online-users", Array.from(onlineUsers.keys()));
    });

    // --- Rooms & Hierarchy Scaling ---
    socket.on("join-workspace", (workspaceId) => {
      socket.join(workspaceId);
    });

    socket.on("join-channel", (channelId) => {
      socket.join(channelId);
    });

    socket.on("leave-channel", (channelId) => {
      socket.leave(channelId);
    });

    // --- Core Chat Engine ---
    socket.on("send-message", async (data) => {
      try {
        const message = await Message.create({
          workspaceId: data.workspaceId,
          channelId: data.channelId,
          sender: data.senderId,
          content: data.content,
        });

        io.to(data.channelId).emit("receive-message", message);
      } catch (error) {
        console.error("Send message error:", error);
      }
    });

    socket.on("typing", (data) => {
      socket.to(data.channelId).emit("typing", data);
    });

    // --- Message Reactions & Threading Extensions ---
    socket.on("message:add-reaction", async (data: { channelId: string; messageId: string; userId: string; emoji: string }) => {
      try {
        io.to(data.channelId).emit("message:reaction-added", {
          messageId: data.messageId,
          userId: data.userId,
          emoji: data.emoji,
        });
      } catch (error) {
        console.error("Reaction error:", error);
      }
    });

    socket.on("message:send-reply", async (data: { channelId: string; parentMessageId: string; senderId: string; content: string }) => {
      try {
        const replyPayload = {
          id: Math.random().toString(36).substring(2, 11),
          parentMessageId: data.parentMessageId,
          sender: data.senderId,
          content: data.content,
          createdAt: new Date(),
        };

        io.to(data.channelId).emit("message:reply-received", replyPayload);
      } catch (error) {
        console.error("Thread reply error:", error);
      }
    });

    // --- Real-Time Systems Notifications ---
    socket.on("send-notification", (data) => {
      const notification = {
        workspaceId: data.workspaceId,
        userId: data.userId,
        title: data.title,
        message: data.message,
        type: data.type || "SYSTEM",
        createdAt: new Date(),
      };

      io.to(data.workspaceId).emit("notification", notification);
    });

    // --- WebRTC Video Meeting Infrastructure ---
    socket.on("join-meeting", ({ roomId, userId }) => {
      socket.join(roomId);

      if (!meetingRooms.has(roomId)) {
        meetingRooms.set(roomId, []);
      }

      const users = meetingRooms.get(roomId) || [];
      if (!users.includes(userId)) {
        users.push(userId);
      }
      meetingRooms.set(roomId, users);

      io.to(roomId).emit("participants", users);
      socket.to(roomId).emit("user-joined", {
        userId,
        socketId: socket.id,
      });
    });

    socket.on("offer", ({ roomId, offer }) => {
      socket.to(roomId).emit("offer", offer);
    });

    socket.on("answer", ({ roomId, answer }) => {
      socket.to(roomId).emit("answer", answer);
    });

    socket.on("ice-candidate", ({ roomId, candidate }) => {
      socket.to(roomId).emit("ice-candidate", candidate);
    });

    socket.on("meeting-message", (data) => {
      io.to(data.roomId).emit("meeting-message", data);
    });

    socket.on("meeting:toggle-track", (data: { roomId: string; userId: string; trackType: "audio" | "video" | "screen"; enabled: boolean }) => {
      socket.to(data.roomId).emit("meeting:track-toggled", {
        userId: data.userId,
        trackType: data.trackType,
        enabled: data.enabled,
      });
    });

    socket.on("leave-meeting", ({ roomId, userId }) => {
      socket.leave(roomId);

      const users = meetingRooms.get(roomId);
      if (users) {
        const updatedUsers = users.filter((id) => id !== userId);
        meetingRooms.set(roomId, updatedUsers);
        io.to(roomId).emit("participants", updatedUsers);
      }

      socket.to(roomId).emit("user-left", userId);
    });

    // --- Multiplayer Project Boards (Kanban Collision Control) ---
    socket.on("board:join", (boardId) => {
      socket.join(`board_${boardId}`);
    });

    socket.on("board:update", (data) => {
      io.to(`board_${data.boardId}`).emit("board:updated", data.updatedBoard);
    });

    socket.on("board:card-grab", (data: { boardId: string; cardId: string; userId: string; username: string }) => {
      socket.to(`board_${data.boardId}`).emit("board:card-locked", {
        cardId: data.cardId,
        userId: data.userId,
        username: data.username,
      });
    });

    socket.on("board:card-release", (data: { boardId: string; cardId: string }) => {
      socket.to(`board_${data.boardId}`).emit("board:card-unlocked", {
        cardId: data.cardId,
      });
    });

    socket.on("board:card-move", (data: { boardId: string; cardId: string; fromColumnId: string; toColumnId: string; newIndex: number }) => {
      socket.to(`board_${data.boardId}`).emit("board:card-moved", {
        cardId: data.cardId,
        fromColumnId: data.fromColumnId,
        toColumnId: data.toColumnId,
        newIndex: data.newIndex
      });
    });

    socket.on("board:card-mutate", (data: { boardId: string; cardId: string; updates: { title?: string; priority?: "LOW" | "MEDIUM" | "HIGH"; assigneeId?: string } }) => {
      socket.to(`board_${data.boardId}`).emit("board:card-mutated", {
        cardId: data.cardId,
        updates: data.updates
      });
    });

    socket.on("board:leave", (boardId) => {
      socket.leave(`board_${boardId}`);
    });

    // --- Clean Handshake Terminations ---
    socket.on("disconnect", () => {
      console.log("User Disconnected:", socket.id);

      for (const [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);
          break;
        }
      }

      io.emit("online-users", Array.from(onlineUsers.keys()));
    });

    // --- Collaborative Document / Task Rich-Text Editing ---
    socket.on("doc:join", (documentId: string) => {
      socket.join(`doc_${documentId}`);
    });

    socket.on("doc:cursor-move", (data: { documentId: string; userId: string; username: string; cursorPosition: { line: number; ch: number } }) => {
      socket.to(`doc_${data.documentId}`).emit("doc:cursor-updated", {
        userId: data.userId,
        username: data.username,
        cursorPosition: data.cursorPosition,
      });
    });

    socket.on("doc:content-change", (data: { documentId: string; delta: any; updatedHtml: string }) => {
      socket.to(`doc_${data.documentId}`).emit("doc:content-updated", {
        delta: data.delta,
        updatedHtml: data.updatedHtml,
      });
    });

    socket.on("doc:leave", (documentId: string) => {
      socket.leave(`doc_${documentId}`);
    });

    // --- Real-Time Performance & System Metrics ---
    socket.on("admin:join-metrics", () => {
      socket.join("admin_metrics_room");

      socket.emit("admin:metrics-snapshot", {
        totalOnlineUsers: onlineUsers.size,
        activeMeetings: meetingRooms.size,
        timestamp: new Date()
      });
    });

    socket.on("metrics:ping", (data: { sentAt: number }) => {
      socket.emit("metrics:pong", {
        serverTime: Date.now(),
        clientSentAt: data.sentAt
      });
    });

    socket.on("metrics:report-error", (data: { context: string; errorMsg: string; userId?: string }) => {
      io.to("admin_metrics_room").emit("admin:error-alert", {
        ...data,
        socketId: socket.id,
        timestamp: new Date()
      });
    });

    // --- Collaborative Canvas & Whiteboard ---
    socket.on("canvas:join", (canvasId: string) => {
      socket.join(`canvas_${canvasId}`);
    });

    socket.on("canvas:draw", (data: { canvasId: string; lastPoint: { x: number; y: number }; currentPoint: { x: number; y: number }; color: string; brushSize: number }) => {
      socket.to(`canvas_${data.canvasId}`).emit("canvas:draw-updated", {
        lastPoint: data.lastPoint,
        currentPoint: data.currentPoint,
        color: data.color,
        brushSize: data.brushSize
      });
    });

    socket.on("canvas:element-add", (data: { canvasId: string; element: { id: string; type: "rect" | "circle" | "text" | "sticky"; x: number; y: number; props: any } }) => {
      socket.to(`canvas_${data.canvasId}`).emit("canvas:element-added", data.element);
    });

    socket.on("canvas:element-move", (data: { canvasId: string; elementId: string; x: number; y: number }) => {
      socket.to(`canvas_${data.canvasId}`).emit("canvas:element-moved", {
        elementId: data.elementId,
        x: data.x,
        y: data.y
      });
    });

    socket.on("canvas:clear", (canvasId: string) => {
      socket.to(`canvas_${canvasId}`).emit("canvas:cleared");
    });

    // --- Real-Time Shared Workspace Clipboard ---
    socket.on("clipboard:join", (workspaceId: string) => {
      socket.join(`clipboard_${workspaceId}`);
    });

    socket.on("clipboard:share", (data: { workspaceId: string; userId: string; username: string; label: string; content: string; type: "text" | "code" | "link" | "color" }) => {
      const clipItem = {
        id: Math.random().toString(36).substring(2, 11),
        userId: data.userId,
        username: data.username,
        label: data.label,
        content: data.content,
        type: data.type,
        copiedAt: new Date()
      };

      socket.to(`clipboard_${data.workspaceId}`).emit("clipboard:received", clipItem);
    });

    socket.on("clipboard:delete", (data: { workspaceId: string; snippetId: string }) => {
      socket.to(`clipboard_${data.workspaceId}`).emit("clipboard:deleted", { snippetId: data.snippetId });
    });

    // --- Collaborative Code Editor & Live Terminal ---
    socket.on("code:join-file", (fileId: string) => {
      socket.join(`file_${fileId}`);
    });

    socket.on("code:editor-change", (data: { fileId: string; userId: string; username: string; changes: any }) => {
      socket.to(`file_${data.fileId}`).emit("code:editor-updated", {
        userId: data.userId,
        username: data.username,
        changes: data.changes
      });
    });

    socket.on("code:selection-change", (data: { fileId: string; userId: string; username: string; selectionRange: any }) => {
      socket.to(`file_${data.fileId}`).emit("code:selection-updated", {
        userId: data.userId,
        username: data.username,
        selectionRange: data.selectionRange
      });
    });

    socket.on("code:execution-stream", (data: { fileId: string; outputLine: string; status: "stdout" | "stderr" | "exit" }) => {
      io.to(`file_${data.fileId}`).emit("code:execution-received", {
        outputLine: data.outputLine,
        status: data.status,
        timestamp: new Date()
      });
    });

    // --- Real-Time Polling & Form Collaboration ---
    socket.on("poll:join", (pollId: string) => {
      socket.join(`poll_${pollId}`);
    });

    socket.on("poll:vote", (data: { pollId: string; optionId: string; userId: string }) => {
      io.to(`poll_${data.pollId}`).emit("poll:updated", {
        optionId: data.optionId,
        userId: data.userId,
        timestamp: new Date()
      });
    });

    socket.on("form:input-focus", (data: { formId: string; fieldName: string; username: string }) => {
      socket.to(`form_${data.formId}`).emit("form:field-focused", {
        fieldName: data.fieldName,
        username: data.username
      });
    });

    socket.on("poll:leave", (pollId: string) => {
      socket.leave(`poll_${pollId}`);
    });

    // --- Real-Time AI Streaming & Global Command Sync ---
    socket.on("ai:join-stream", (queryId: string) => {
      socket.join(`ai_stream_${queryId}`);
    });

    socket.on("ai:chunk-stream", (data: { queryId: string; textChunk: string; isComplete: boolean }) => {
      io.to(`ai_stream_${data.queryId}`).emit("ai:chunk-received", {
        textChunk: data.textChunk,
        isComplete: data.isComplete
      });
    });

    socket.on("search:active-query", (data: { workspaceId: string; query: string; username: string }) => {
      socket.to(data.workspaceId).emit("search:global-trend", {
        query: data.query,
        username: data.username,
        searchedAt: new Date()
      });
    });

    socket.on("ai:leave-stream", (queryId: string) => {
      socket.leave(`ai_stream_${queryId}`);
    });

    // --- Real-Time File Upload Tracking & Asset Processing ---
    socket.on("file:track-progress", (fileId: string) => {
      socket.join(`file_progress_${fileId}`);
    });

    socket.on("file:upload-progress", (data: { fileId: string; uploadedBytes: number; totalBytes: number; percentage: number }) => {
      io.to(`file_progress_${data.fileId}`).emit("file:upload-status", {
        percentage: data.percentage,
        uploadedBytes: data.uploadedBytes,
        totalBytes: data.totalBytes
      });
    });

    socket.on("file:processing-stage", (data: { fileId: string; stage: "VIRUS_SCANNING" | "TRANSCODING" | "OPTIMIZING" | "COMPLETED" | "FAILED"; statusText: string }) => {
      io.to(`file_progress_${data.fileId}`).emit("file:stage-updated", {
        stage: data.stage,
        statusText: data.statusText,
        timestamp: new Date()
      });
    });

    socket.on("file:untrack-progress", (fileId: string) => {
      socket.leave(`file_progress_${fileId}`);
    });

    // --- Collaborative Mind Mapping & Dynamic Flowcharts ---
    socket.on("mindmap:join", (mapId: string) => {
      socket.join(`mindmap_${mapId}`);
    });

    socket.on("mindmap:node-connect", (data: { mapId: string; connectionId: string; fromNodeId: string; toNodeId: string; label?: string }) => {
      socket.to(`mindmap_${data.mapId}`).emit("mindmap:node-connected", {
        connectionId: data.connectionId,
        fromNodeId: data.fromNodeId,
        toNodeId: data.toNodeId,
        label: data.label
      });
    });

    socket.on("mindmap:node-mutate", (data: { mapId: string; nodeId: string; properties: { label?: string; color?: string; size?: { width: number; height: number } } }) => {
      socket.to(`mindmap_${data.mapId}`).emit("mindmap:node-mutated", {
        nodeId: data.nodeId,
        properties: data.properties
      });
    });

    socket.on("mindmap:node-delete", (data: { mapId: string; nodeId: string }) => {
      socket.to(`mindmap_${data.mapId}`).emit("mindmap:node-deleted", {
        nodeId: data.nodeId
      });
    });

    // --- Real-Time Presentation Sync & Remote Laser Pointers ---
    socket.on("presentation:join", (streamId: string) => {
      socket.join(`presentation_${streamId}`);
    });

    socket.on("presentation:pointer-move", (data: { streamId: string; userId: string; username: string; coordinates: { x: number; y: number } }) => {
      socket.to(`presentation_${data.streamId}`).emit("presentation:pointer-updated", {
        userId: data.userId,
        username: data.username,
        coordinates: data.coordinates
      });
    });

    socket.on("presentation:ping-click", (data: { streamId: string; coordinates: { x: number; y: number }; color: string }) => {
      io.to(`presentation_${data.streamId}`).emit("presentation:ping-received", {
        coordinates: data.coordinates,
        color: data.color,
        timestamp: new Date()
      });
    });

    socket.on("presentation:slide-change", (data: { streamId: string; activePage: number }) => {
      socket.to(`presentation_${data.streamId}`).emit("presentation:slide-updated", {
        activePage: data.activePage
      });
    });

    // --- Real-Time DevOps Pipelines & Deployment Sync ---
    socket.on("devops:join-pipeline", (pipelineId: string) => {
      socket.join(`pipeline_${pipelineId}`);
    });

    socket.on("devops:log-stream", (data: { pipelineId: string; textLine: string; type: "info" | "warning" | "error" | "success" }) => {
      io.to(`pipeline_${data.pipelineId}`).emit("devops:log-received", {
        textLine: data.textLine,
        type: data.type,
        timestamp: new Date()
      });
    });

    socket.on("devops:stage-change", (data: { pipelineId: string; stage: "CHECKOUT" | "TESTING" | "BUILDING" | "SCANNING" | "DEPLOYING" | "HEALTH_CHECK"; status: "PENDING" | "RUNNING" | "SUCCESS" | "FAILED" }) => {
      io.to(`pipeline_${data.pipelineId}`).emit("devops:stage-updated", {
        stage: data.stage,
        status: data.status,
        timestamp: new Date()
      });
    });

    socket.on("devops:leave-pipeline", (pipelineId: string) => {
      socket.leave(`pipeline_${pipelineId}`);
    });

    // --- Collaborative AI Playground & Agent Executions ---
    socket.on("ai-playground:join", (playgroundId: string) => {
      socket.join(`playground_${playgroundId}`);
    });

    socket.on("ai-playground:config-update", (data: { playgroundId: string; userId: string; updates: { systemPrompt?: string; temperature?: number; model?: string } }) => {
      socket.to(`playground_${data.playgroundId}`).emit("ai-playground:config-updated", {
        userId: data.userId,
        updates: data.updates
      });
    });

    socket.on("ai-agent:node-state", (data: { playgroundId: string; agentName: string; status: "THINKING" | "TOOL_CALL" | "RETRYING" | "SUCCESS"; message: string }) => {
      io.to(`playground_${data.playgroundId}`).emit("ai-agent:node-updated", {
        agentName: data.agentName,
        status: data.status,
        message: data.message,
        timestamp: new Date()
      });
    });

    socket.on("ai-playground:leave", (playgroundId: string) => {
      socket.leave(`playground_${playgroundId}`);
    });

    // --- Collaborative Spreadsheets & Live Grid Processing ---
    socket.on("sheet:join", (sheetId: string) => {
      socket.join(`sheet_${sheetId}`);
    });

    socket.on("sheet:cell-update", (data: { sheetId: string; userId: string; cellId: string; value: string; formula?: string }) => {
      socket.to(`sheet_${data.sheetId}`).emit("sheet:cell-updated", {
        userId: data.userId,
        cellId: data.cellId,
        value: data.value,
        formula: data.formula
      });
    });

    socket.on("sheet:selection-change", (data: { sheetId: string; userId: string; username: string; selectedCellIds: string[] }) => {
      socket.to(`sheet_${data.sheetId}`).emit("sheet:selection-updated", {
        userId: data.userId,
        username: data.username,
        selectedCellIds: data.selectedCellIds
      });
    });

    socket.on("sheet:structure-change", (data: { sheetId: string; type: "INSERT_ROW" | "INSERT_COL" | "DELETE_ROW" | "DELETE_COL"; index: number }) => {
      socket.to(`sheet_${data.sheetId}`).emit("sheet:structure-updated", {
        type: data.type,
        index: data.index
      });
    });

    // --- Collaborative Dashboard Analytics & Layout Sync ---
    socket.on("dashboard:join", (dashboardId: string) => {
      socket.join(`dashboard_${dashboardId}`);
    });

    socket.on("dashboard:widget-resize", (data: { dashboardId: string; userId: string; widgetId: string; layout: { x: number; y: number; w: number; h: number } }) => {
      socket.to(`dashboard_${data.dashboardId}`).emit("dashboard:widget-resized", {
        userId: data.userId,
        widgetId: data.widgetId,
        layout: data.layout
      });
    });

    socket.on("dashboard:filter-change", (data: { dashboardId: string; userId: string; username: string; activeFilters: { dateRange: string; segment?: string } }) => {
      socket.to(`dashboard_${data.dashboardId}`).emit("dashboard:filter-updated", {
        userId: data.userId,
        username: data.username,
        activeFilters: data.activeFilters
      });
    });

    socket.on("dashboard:leave", (dashboardId: string) => {
      socket.leave(`dashboard_${dashboardId}`);
    });

    // --- Collaborative Presentation Slide Deck Designer & Sync ---
    socket.on("deck:join", (deckId: string) => {
      socket.join(`deck_${deckId}`);
    });

    socket.on("deck:component-mutate", (data: { deckId: string; slideId: string; componentId: string; updates: { x?: number; y?: number; w?: number; h?: number; content?: string } }) => {
      socket.to(`deck_${data.deckId}`).emit("deck:component-mutated", {
        slideId: data.slideId,
        componentId: data.componentId,
        updates: data.updates
      });
    });

    socket.on("deck:slide-select", (data: { deckId: string; userId: string; username: string; activeSlideIndex: number }) => {
      socket.to(`deck_${data.deckId}`).emit("deck:slide-selected", {
        userId: data.userId,
        username: data.username,
        activeSlideIndex: data.activeSlideIndex
      });
    });

    socket.on("deck:leave", (deckId: string) => {
      socket.leave(`deck_${deckId}`);
    });

    // --- Collaborative Sprint Retrospectives & Feedback Walls ---
    socket.on("retro:join", (retroId: string) => {
      socket.join(`retro_${retroId}`);
    });

    socket.on("retro:card-add", (data: { retroId: string; cardId: string; columnType: "START" | "STOP" | "CONTINUE"; content: string; isAnonymous: boolean }) => {
      socket.to(`retro_${data.retroId}`).emit("retro:card-added", {
        cardId: data.cardId,
        columnType: data.columnType,
        content: data.content,
        isAnonymous: data.isAnonymous
      });
    });

    socket.on("retro:card-vote", (data: { retroId: string; cardId: string; userId: string; voteType: "UPVOTE" | "HEART" | "THUMBS_DOWN" }) => {
      io.to(`retro_${data.retroId}`).emit("retro:card-voted", {
        cardId: data.cardId,
        userId: data.userId,
        voteType: data.voteType
      });
    });

    socket.on("retro:leave", (retroId: string) => {
      socket.leave(`retro_${retroId}`);
    });

    // --- Collaborative Document Commenting & Annotations ---
    socket.on("doc:comment-create", (data: { documentId: string; threadId: string; userId: string; username: string; selectionText: string; comment: string; range: any }) => {
      const newThread = {
        threadId: data.threadId,
        userId: data.userId,
        username: data.username,
        selectionText: data.selectionText,
        comment: {
          id: Math.random().toString(36).substring(2, 11),
          text: data.comment,
          createdAt: new Date()
        },
        range: data.range
      };

      socket.to(`doc_${data.documentId}`).emit("doc:comment-received", newThread);
    });

    socket.on("doc:comment-reply", (data: { documentId: string; threadId: string; userId: string; username: string; commentText: string }) => {
      socket.to(`doc_${data.documentId}`).emit("doc:reply-received", {
        threadId: data.threadId,
        reply: {
          id: Math.random().toString(36).substring(2, 11),
          username: data.username,
          text: data.commentText,
          createdAt: new Date()
        }
      });
    });

    // --- Collaborative Project Roadmaps & Gantt Charts ---
    socket.on("roadmap:join", (roadmapId: string) => {
      socket.join(`roadmap_${roadmapId}`);
    });

    socket.on("roadmap:milestone-shift", (data: { roadmapId: string; milestoneId: string; userId: string; schedule: { startDate: string; endDate: string } }) => {
      socket.to(`roadmap_${data.roadmapId}`).emit("roadmap:milestone-shifted", {
        milestoneId: data.milestoneId,
        userId: data.userId,
        schedule: data.schedule
      });
    });

    socket.on("roadmap:dependency-link", (data: { roadmapId: string; linkId: string; fromMilestoneId: string; toMilestoneId: string; dependencyType: "FS" | "SS" | "FF" | "SF" }) => {
      socket.to(`roadmap_${data.roadmapId}`).emit("roadmap:dependency-linked", {
        linkId: data.linkId,
        fromMilestoneId: data.fromMilestoneId,
        toMilestoneId: data.toMilestoneId,
        dependencyType: data.dependencyType
      });
    });

    socket.on("roadmap:leave", (roadmapId: string) => {
      socket.leave(`roadmap_${roadmapId}`);
    });

    // --- Collaborative Code Editor & Live Pair Programming ---
    socket.on("code:join", (fileId: string) => {
      socket.join(`code_${fileId}`);
    });

    socket.on("code:text-change", (data: { fileId: string; userId: string; text: string; delta?: any }) => {
      socket.to(`code_${data.fileId}`).emit("code:text-updated", {
        userId: data.userId,
        text: data.text,
        delta: data.delta
      });
    });

    socket.on("code:cursor-move", (data: { fileId: string; userId: string; username: string; position: { line: number; ch: number } }) => {
      socket.to(`code_${data.fileId}`).emit("code:cursor-updated", {
        userId: data.userId,
        username: data.username,
        position: data.position
      });
    });

    socket.on("code:terminal-output", (data: { fileId: string; outputLine: string; isError: boolean }) => {
      io.to(`code_${data.fileId}`).emit("code:output-received", {
        outputLine: data.outputLine,
        isError: data.isError,
        timestamp: new Date()
      });
    });

    socket.on("code:leave", (fileId: string) => {
      socket.leave(`code_${fileId}`);
    });

    // --- Collaborative Media Review & Playback Timestamp Sync ---
    socket.on("media:join", (mediaId: string) => {
      socket.join(`media_${mediaId}`);
    });

    socket.on("media:playback-control", (data: { mediaId: string; userId: string; action: "PLAY" | "PAUSE" | "SEEK"; currentTime: number }) => {
      socket.to(`media_${data.mediaId}`).emit("media:playback-updated", {
        userId: data.userId,
        action: data.action,
        currentTime: data.currentTime,
        timestamp: new Date()
      });
    });

    socket.on("media:marker-add", (data: { mediaId: string; markerId: string; timestampInSeconds: number; note: string; username: string }) => {
      io.to(`media_${data.mediaId}`).emit("media:marker-received", {
        markerId: data.markerId,
        timestampInSeconds: data.timestampInSeconds,
        note: data.note,
        username: data.username,
        createdAt: new Date()
      });
    });

    socket.on("media:leave", (mediaId: string) => {
      socket.leave(`media_${mediaId}`);
    });

    // --- Collaborative Form Builder & Live Response Sync ---
    socket.on("form:join", (formId: string) => {
      socket.join(`form_${formId}`);
    });

    socket.on("form:element-mutate", (data: { formId: string; elementId: string; userId: string; updates: { label?: string; placeholder?: string; isRequired?: boolean; orderIndex?: number } }) => {
      socket.to(`form_${data.formId}`).emit("form:element-mutated", {
        elementId: data.elementId,
        userId: data.userId,
        updates: data.updates
      });
    });

    socket.on("form:response-submit", (data: { formId: string; responseId: string; summarySnapshot: { totalSubmissions: number; lastResponseAt: Date } }) => {
      io.to(`form_${data.formId}`).emit("form:summary-updated", {
        responseId: data.responseId,
        summarySnapshot: data.summarySnapshot
      });
    });

    socket.on("form:leave", (formId: string) => {
      socket.leave(`form_${formId}`);
    });

    // --- Collaborative Video Calls & Breakout Room Coordination ---
    socket.on("meeting:join", (meetingId: string) => {
      socket.join(`meeting_${meetingId}`);
    });

    socket.on("meeting:distribute-breakouts", (data: { meetingId: string; rooms: Array<{ roomId: string; name: string; assignedUserIds: string[] }> }) => {
      socket.to(`meeting_${data.meetingId}`).emit("meeting:breakouts-assigned", {
        rooms: data.rooms,
        timestamp: new Date()
      });
    });

    socket.on("meeting:timer-sync", (data: { meetingId: string; durationSeconds: number; action: "START" | "PAUSE" | "RESET" }) => {
      io.to(`meeting_${data.meetingId}`).emit("meeting:timer-updated", {
        durationSeconds: data.durationSeconds,
        action: data.action,
        serverTime: new Date()
      });
    });

    socket.on("meeting:leave", (meetingId: string) => {
      socket.leave(`meeting_${meetingId}`);
    });
  });

  return io;
};

export const getIO = () => io;
