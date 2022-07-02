import React, { useEffect } from "react";
import config from "./scannerConfig.json";
import Quagga from "quagga";

const Scanner = (props) => {
  const { onDetected, image } = props;

  useEffect(() => {
    console.log(URL.createObjectURL(image));
    Quagga.init(config, (err) => {
      if (err) {
        console.log(err, "error msg");
      }
      Quagga.start();
      return () => {
        Quagga.stop();
      };
    });

    //detecting boxes on stream
    // Quagga.onProcessed((result) => {
    //   var drawingCtx = Quagga.canvas.ctx.overlay,
    //     drawingCanvas = Quagga.canvas.dom.overlay;

    //   if (result) {
    //     if (result.boxes) {
    //       drawingCtx.clearRect(
    //         0,
    //         0,
    //         Number(drawingCanvas.getAttribute("width")),
    //         Number(drawingCanvas.getAttribute("height"))
    //       );
    //       result.boxes
    //         .filter(function (box) {
    //           return box !== result.box;
    //         })
    //         .forEach(function (box) {
    //           Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
    //             color: "green",
    //             lineWidth: 2,
    //           });
    //         });
    //     }

    //     if (result.box) {
    //       Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, {
    //         color: "#00F",
    //         lineWidth: 2,
    //       });
    //     }

    //     if (result.codeResult && result.codeResult.code) {
    //       Quagga.ImageDebug.drawPath(
    //         result.line,
    //         { x: "x", y: "y" },
    //         drawingCtx,
    //         { color: "red", lineWidth: 3 }
    //       );
    //     }
    //   }
    // });
    Quagga.decodeSingle(
      {
        decoder: {
          readers: ["ean_reader"], // List of active readers
        },
        locate: true, // try to locate the barcode in the image
        src: URL.createObjectURL(image), // or 'data:image/jpg;base64,' + data
      },
      function (result) {
        if (result.codeResult) {
          console.log("result", result.codeResult.code);
        } else {
          console.log("not detected");
        }
      }
    );

    Quagga.onDetected(detected);
  }, []);

  const detected = (result) => {
    onDetected(result.codeResult.code);
  };

  return (
    // If you do not specify a target,
    // QuaggaJS would look for an element that matches
    // the CSS selector #interactive.viewport
    <div id="interactive" className="viewport" />
  );
};

export default Scanner;
