import React from "react";
import { Cropper } from "react-cropper";
import "cropperjs/dist/cropper.css";
import "./cropper.css";

import { useState } from "react";

// import { Buffer } from "buffer";
import { Button, Typography } from "@mui/material";

const defaultSrc =
  "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";

export const CropperComponent = (props) => {
  const [image, setImage] = useState(defaultSrc);
  // const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState();

  const onChangeProps = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };
  onChangeProps(props.src);

  const getCropData = async () => {
    if (typeof cropper !== "undefined") {
      const croppedUrl = cropper.getCroppedCanvas().toDataURL("image/png");
      // console.log(image);
      // Base64からバイナリへ変換
      // let bin = Buffer.from(croppedUrl.replace(/^.*,/, ""), "base64");
      var bin = atob(croppedUrl.replace(/^.*,/, ""));
      //   var bin = atob(cropData.replace(/^.*,/, ""));
      let buffer = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) {
        buffer[i] = bin.charCodeAt(i);
      }

      //ファイル名は日付
      let dt = new Date();
      let filename = dt.toLocaleString().replace(/\/| |:/g, "");

      //バイナリでファイルを作る
      let file = new File([buffer.buffer], filename + ".png", {
        type: "image/png",
      });

      await new Promise((resolve) => setTimeout(resolve, 2000));
      //   var formData = new FormData();
      //   formData.append("image", file);
      props.setCroppedData(file);
      // console.log(typeof file);
      props.setCropModal(false);
    }
  };

  const rotateCrop = async (angle) => {
    if (typeof cropper === 'undefined') return;

    cropper.rotate(angle);
  }

  return (
    <div>
      <div style={{ width: "100%" }}>
        <Typography variant="h2" sx={{ mb: 2, mt: 4 }}>
          引用部分の切り抜き
        </Typography>
        <Cropper
          style={{ height: 300, width: "80%", margin: "0 auto" }}
          zoomTo={0.5}
          initialAspectRatio={1}
          // preview=".img-preview"
          src={image}
          viewMode={1}
          dragMode={'none'}
          guides={false}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={false}
          responsive={true}
          autoCropArea={1}
          zoomable={false}
          scalable={false}
          center={false}
          checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
          onInitialized={(instance) => {
            setCropper(instance);
            instance.reset();
          }}
        />
      </div>
      <div>
        <Button
          onClick={ () => rotateCrop(-1) }
        >
          ←
        </Button>
        <Button
          onClick={() => rotateCrop(1)}
        >
          →
        </Button>
      </div>
      <div>
        {/* <div className="box" style={{ width: "70%" }}>
          <Typography variant="h2">Preview</Typography>
          <div
            className="img-preview"
            style={{
              width: "100%",
              height: "100px",
              border: "2px solid #FDFEFE",
            }}
          />
        </div> */}
        <Button
          style={{
            float: "bottom",
            margin: "16px 0",
            border: "#0a0a0a 2px solid",
          }}
          onClick={getCropData}
        >
          切り抜きを完了
        </Button>
      </div>
      <br style={{ clear: "both" }} />
    </div>
  );
};

export default CropperComponent;
