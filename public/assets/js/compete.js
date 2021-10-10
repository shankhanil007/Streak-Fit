const PRE = "DELTA";
const SUF = "MEET";
var room_id;
var getUserMedia =
  navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia;
var local_stream;

var peer = null;
var currentPeer = null;
const videoGrid = document.getElementById("video-grid");
const socket = io();

socket.on("user-disconnected", (userId) => {
  console.log(userId);
  const video = document.getElementById(userId);
  video.remove();
});

socket.on("leaderboard-updates", () => {
  console.log("Update");
  leaderBoard();
});

var userName = "";
var stage = "";
var counter = 0;
var score = 0;
var flag = 0;
var exercise = "";
var loaded = false;
var loadedFlag = 0;
var room = "";
var finished = false;
var gamecount = 0;
var exerciseTime = 0;
var breakTime = 0;
var games = [];

//---------------------------------------------------------------------------------------

const canvasElement = document.getElementsByClassName("output_canvas")[0];
const canvasCtx = canvasElement.getContext("2d");

function onResults(results) {
  if (!results.poseLandmarks) {
    return;
  }

  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  canvasCtx.drawImage(
    results.image,
    0,
    0,
    canvasElement.width,
    canvasElement.height
  );
  drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, {
    color: "#00FF00",
    lineWidth: 4,
  });
  drawLandmarks(canvasCtx, results.poseLandmarks, {
    color: "#FF0000",
    lineWidth: 2,
  });

  loaded = true;

  if (loaded == true && loadedFlag == 0) {
    console.log("loaded");
    leaderBoard();
    loadedFlag = 1;
  }

  if (exercise.localeCompare("skipping") == 0 && finished == false) {
    let shoulder = results.poseLandmarks[11].y;
    //   console.log(shoulder);
    if (shoulder < 0.4 && flag == 1) {
      flag = 0;
      counter += 1;
      score += 1;
      document.getElementById("result").innerHTML = "Count : " + counter;
    } else if (shoulder >= 0.45) {
      flag = 1;
    }
  } else if (exercise.localeCompare("lifting") == 0 && finished == false) {
    let shoulder = [results.poseLandmarks[11].x, results.poseLandmarks[11].y];
    let elbow = [results.poseLandmarks[13].x, results.poseLandmarks[13].y];
    let wrist = [results.poseLandmarks[15].x, results.poseLandmarks[15].y];
    let angle = find_angle(shoulder, elbow, wrist);
    if (angle > 2) {
      stage = "down";
      document.getElementById("result").innerHTML =
        "Count : " + counter + " DOWN";
    }
    if (
      angle < 1 &&
      (stage.localeCompare("") == 0 || stage.localeCompare("down") == 0)
    ) {
      stage = "up";
      counter += 1;
      score += 1;

      document.getElementById("result").innerHTML =
        "Count : " + counter + " UP";
    }
  } else if (exercise.localeCompare("situps") == 0 && finished == false) {
    let shoulder = results.poseLandmarks[11].y * 100;

    if (shoulder < 50 && flag == 1) {
      flag = 0;
      counter += 1;
      score += 1;
      document.getElementById("result").innerHTML = "Count : " + counter;
    } else if (shoulder >= 75) flag = 1;
  }

  canvasCtx.restore();
}

const pose = new Pose({
  locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
  },
});
pose.setOptions({
  modelComplexity: 1,
  smoothLandmarks: true,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5,
});
pose.onResults(onResults);

function model() {
  let video = document.getElementById("local-video");
  video.style.display = "none";
  canvasElement.style.display = "block";
  const camera = new Camera(video, {
    onFrame: async () => {
      await pose.send({ image: video });
    },
    width: 500,
    height: 450,
  });
  camera.start();
}
//----------------------------------------------------------------------------------------

function createRoom() {
  console.log("Creating Room");
  room = document.getElementById("room-input").value;
  if (room == " " || room == "") {
    alert("Please enter room number");
    return;
  }
  var userid = document.getElementById("user-id").value;
  peer = new Peer();
  peer.on("open", (id) => {
    console.log("Peer Connected with ID: ", id);
    userName = document.getElementById("user-name").value;
    socket.emit("new-user", { id, room, userName });
    socket.emit("update_leaderboard");
    hideModal();
    document.getElementById("meetArea").style.display = "block";
    document.getElementById("startgame").style.display = "block";
    exerciseTime = parseFloat(document.getElementById("exerciseTime").value);
    breakTime = parseFloat(document.getElementById("breakTime").value);

    if (document.getElementById("lifting").checked == true)
      games.push("lifting");
    if (document.getElementById("skipping").checked == true)
      games.push("skipping");
    if (document.getElementById("situps").checked == true) games.push("situps");

    getUserMedia(
      { video: true, audio: false },
      (stream) => {
        local_stream = stream;
        setLocalStream(local_stream);
      },
      (err) => {
        console.log(err);
      }
    );
    notify("Waiting for peer to join.");
  });

  peer.on("call", (call) => {
    call.answer(local_stream);
    const video = document.createElement("video");
    // video.setAttribute("id", call.peer);
    call.on("stream", (stream) => {
      setRemoteStream(stream, video, call.peer);
    });
    currentPeer = call;
  });
}

function joinRoom() {
  console.log("Joining Room");
  room = document.getElementById("room-input").value;
  if (room == " " || room == "") {
    alert("Please enter room number");
    return;
  }
  room_id = PRE + room + SUF;
  hideModal();
  document.getElementById("meetArea").style.display = "block";
  peer = new Peer();
  //   {
  //   key: "peerjs",
  //   host: "fitness-pro-404.herokuapp.com/",
  //   port: 443,
  //   path: "/",
  //   secure: true,
  // }
  peer.on("open", (id) => {
    console.log("Connected with Id: " + id);
    userName = document.getElementById("user-name").value;
    socket.emit("new-user", { id, room, userName });
    socket.emit("update_leaderboard");
    // $.getScript("users.js", function () {
    //   console.log(addUser(id));
    // });

    // $.post("/addpeer/" + id);

    getUserMedia(
      { video: true, audio: false },
      (stream) => {
        local_stream = stream;
        setLocalStream(local_stream);
        notify("Joining peer");

        peer.on("call", function (call) {
          // Answer the call, providing our mediaStream
          call.answer(local_stream);
          const video = document.createElement("video");
          // video.setAttribute("id", call.peer);
          call.on("stream", (stream) => {
            setRemoteStream(stream, video, call.peer);
          });
        });

        console.log(call);
        call.peers[room].forEach(function (id) {
          const calls = peer.call(id, stream);
          const video = document.createElement("video");
          // video.setAttribute("id", id);
          calls.on("stream", (stream) => {
            setRemoteStream(stream, video, id);
          });
          calls.on("close", () => {
            console.log("Closed");
            video.remove();
          });
          currentPeer = calls;
        });
      },
      (err) => {
        console.log(err);
      }
    );
  });
}

function setLocalStream(stream) {
  let video = document.getElementById("local-video");
  video.srcObject = stream;
  video.autoplay = true;
  video.playsInline = true;
  video.muted = true;

  const camera = new Camera(video, {
    onFrame: async () => {
      await pose.send({ image: video });
    },
    width: 500,
    height: 450,
  });
  // camera.start();
}

function setRemoteStream(stream, video, id) {
  video.srcObject = stream;
  video.autoplay = true;
  video.playsInline = true;
  video.muted = true;

  // video.srcObject = stream;
  // video.play();
  video.style.width = "70%";
  video.style.margin = "1.5em";
  video.style.marginBottom = "10px";

  var name = "";

  fetch(`http://localhost:3000/decodepeer/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      name = json.userName;
      const div1 = document.createElement("div");
      div1.setAttribute("id", id);
      const div2 = document.createElement("span");
      div2.innerHTML += `<br><h5 style="margin-left: 1.5em">${name}</h5>`;
      div1.appendChild(video);
      div1.appendChild(div2);
      videoGrid.appendChild(div1);
    });
}

function hideModal() {
  document.getElementById("entry-modal").hidden = true;
}

function notify(msg) {
  let notification = document.getElementById("notification");
  notification.innerHTML = msg;
  notification.hidden = false;
  setTimeout(() => {
    notification.hidden = true;
  }, 3000);
}

// Learnt how to run methods from another JS file and how to make API requests from JS using jQuery
