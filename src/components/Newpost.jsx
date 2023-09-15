// import * as canvas from 'canvas';
import * as faceapi from "face-api.js";
import { useEffect, useRef, useState } from "react";

export const Newpost = ({ image }) => {
  const { url, width, height } = image;
  const [faces, setFaces] = useState([]);
  const [friends, setFriends] = useState([]);
  const [input, setInput] = useState("");

  const imageRef = useRef();
  const canvasRef = useRef();

  const handleImage = async () => {
    const detections = await faceapi.detectAllFaces(
      imageRef.current,
      new faceapi.TinyFaceDetectorOptions()
    );

    // .withFaceLandmarks()
    // .withFaceExpressions();
    // console.log(detections);

    //   canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(
    //     imageRef.current
    //   );

    //   faceapi.matchDimensions(canvasRef.current, {
    //     width: "",
    //     height: "",
    //   });

    //   const allResizedDetections = faceapi.resizeResults(detections, {
    //     width: "",
    //     height: "",
    //   });

    //   faceapi.draw.drawDetections(canvasRef.current, allResizedDetections);
    //   faceapi.draw.drawFaceExpressions(canvasRef.current, allResizedDetections);
    //   faceapi.draw.drawFaceLandmarks(canvasRef.current, allResizedDetections);
    setFaces(detections.map((d) => Object.values(d.box)));
  };

  const enter = () => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.lineWidth = 5;
    ctx.strokeStyle = "yellow";
    faces.map((face) => ctx.strokeRect(...face));
  };

  useEffect(() => {
    const loadModels = () => {
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
        faceapi.nets.faceExpressionNet.loadFromUri("/models"),
      ])
        .then(handleImage)
        .catch((err) => console.log(err));
    };
    imageRef.current && loadModels();
    // models will be loaded before image load. to prevent this once img there then load models
  }, []);

  const addFriend = (e) => {
    setFriends((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  console.log(friends);
  const handleSend = (e) => {
    setInput("");
  };
  return (
    <div className="container">
      <div className="left" style={{ width, height }}>
        <img
          className="img"
          ref={imageRef}
          crossOrigin="anonymous"
          src={url}
          alt=""
          style={{
            objectFit: "contain", // or 'contain' depending on our desired behavior
            width: "100%",
            height: "100%",
          }}
        />
        <canvas
          onMouseEnter={enter}
          ref={canvasRef}
          width={width}
          height={height}
        />
        {faces.map((face, i) => (
          <input
            name={`input${i}`}
            style={{ left: face[0], top: face[1] + face[3] + 5 }}
            placeholder="Tag a friend"
            key={i}
            className="friendInput"
            onChange={addFriend}
          />
        ))}
      </div>
      <div className="right">
        <h1>Share your post</h1>
        <input
          type="text"
          placeholder="What's on your mind?"
          className="rightInput"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        {friends && (
          <span className="friends">
            with <span className="name">{Object.values(friends) + " "}</span>
          </span>
        )}
        <button className="rightButton" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
};

//
//
//
//
//
//
//
//
//
//
//
//     {/* 1. canvas basically allows us to draw some shapes or outlines in our image or app
//     2. ref to locate useRef, and its function is same as getelementbyId, helps to select or connect with something in the dom

//     */}
//   </div>
// all the above code initially wrote then deleted

//1.  {/* 1. canvas basically allows us to draw some shapes or outlines in our image or app
// 2. ref to locate useRef, and its function is same as getelementbyId, helps to select or connect with something in the dom

//await faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
// accordingly for the other models:
// await faceapi.nets.faceLandmark68Net.loadFromUri('/models')
// await faceapi.nets.faceRecognitionNet.loadFromUri('/models')
// ...

// 3. promise.all===load all models at the same time
// 4. * to select all , given in the documentation

//  5. imagerav.com after that let's draw those faces  so i will say paste api and draw and firstly i'm
// gonna draw detections and i'm gonna give my canvas  ref like that and detections which we found here
// as you can see there are two faces but its  position is different that because we didn't give
// any dimension for face api to prevent this i will  come here and say face api and match dimensions
// and i'm gonna give canvas here current and  inside this object i'm gonna give my width
// and height like that and finally let's write  here with highest version i will say resized
// and face api resize results and for all  detections we are gonna use again those bit
// and height and finally instead of detections we  can use new resize version of these detections
