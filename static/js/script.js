// $(document).ready(function () {
//   // Get the video element
//   const video = $("#video")[0];

//   // Request access to the device's camera
//   navigator.mediaDevices
//     .getUserMedia({ video: true })
//     .then((stream) => {
//       // Set the video element's srcObject to the camera stream
//       video.srcObject = stream;
//       video.play();
//     })
//     .catch((err) => {
//       console.error("Could not access camera:", err);
//     });
// });


// const video = document.getElementById('video');

// const startButton = document.getElementById('start_rec');
// startButton.addEventListener('click', () => {
//     navigator.mediaDevices.getUserMedia({ video: true })
//         .then(stream => {
//             video.srcObject = stream;
//             video.play();
//         })
//         .catch(err => {
//             console.error('Could not access camera:', err);
//         });
// });

// const button = document.getElementById('start_rec');
// button.addEventListener('click', () => {
//   fetch('/video')
//     .then(response => {
//       if (response.ok) {
//         return response.text();
//       } else {
//         throw new Error('Network response was not ok');
//       }
//     })
//     .then(data => {
//       document.body.innerHTML = data;
//       const video = document.getElementById('video');
//       video.src = "/video_feed";
//     })
//     .catch(error => {
//       console.error('Error:', error);
//     });
// });
$(document).ready(function () {
    // Get the video element
    const video = $("#video")[0];
  
    // Request access to the device's camera
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        // Set the video element's srcObject to the camera stream
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error("Could not access camera:", err);
      });
  
    const button = $("#start_rec");
    button.on("click", function () {
      $.ajax({
        url: "/video_feed",
        type: "GET",
        success: function (data) {
          $("body").html(data);
          const video = $("#video")[0];
          video.src = "/video_feed";
        },
        error: function (error) {
          console.log("Error:", error);
        },
      });
    });
  });
  