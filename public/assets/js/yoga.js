// ----------------------------------------------------------------------------------
const videoElement = document.getElementsByClassName("input_video")[0];
const canvasElement = document.getElementsByClassName("output_canvas")[0];
const canvasCtx = canvasElement.getContext("2d");
var landmarks;

function onResults(results) {
  if (!results.poseLandmarks) {
    return;
  }

  landmarks = results;
  $.ajax({
    type: "GET",
    url: "http://localhost:8000/landmarks",
    data: {
      results: JSON.stringify(landmarks.poseLandmarks),
      expected_pose: pose_data[pose_index].pose,
    },
    contentType: "application/json",
    dataType: "json",
    success: function (data) {
      data = JSON.parse(data);
      console.log(data);
      if (parseInt(data.accuracy) > percentage) {
        percentage = parseInt(data.accuracy);
      }
    },
  });

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

function join() {
  const camera = new Camera(videoElement, {
    onFrame: async () => {
      await pose.send({ image: videoElement });
    },
    width: 500,
    height: 450,
  });
  camera.start();
}
// ----------------------------------------------------------------------------------
