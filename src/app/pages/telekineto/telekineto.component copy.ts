import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as posenet from '@tensorflow-models/posenet';
import '@tensorflow/tfjs-backend-webgl';
import { any } from '@tensorflow/tfjs-core';
import dat from 'dat.gui';
import Stats from 'stats-js';

import { MobileNetMultiplier, PoseNetOutputStride } from 'src/app/poseNet';
import { PoseNetArchitecture, PoseNetQuantBytes } from 'src/app/poseNet/types';
import {
  drawBoundingBox,
  drawKeypoints,
  drawSkeleton,
  isMobile,
  toggleLoadingUI,
  tryResNetButtonName,
  tryResNetButtonText,
  updateTryResNetButtonDatGuiCss,
} from './demo_util';

@Component({
  selector: 'app-telekineto',
  templateUrl: './telekineto.component.html',
  styleUrls: ['./telekineto.component.scss'],
})
export class COPYTelekinetoComponent implements OnInit {
  @ViewChild('video', { static: false }) videoElement: ElementRef;
  @ViewChild('output', { static: false }) outputElement: ElementRef;
  @ViewChild('info', { static: false }) infoElement: ElementRef;
  stats = new Stats();
  video;
  videoWidth = 600;
  videoHeight = 500;
  defaultQuantBytes: PoseNetQuantBytes = 2;
  defaultArchitecture: PoseNetArchitecture = 'MobileNetV1';
  guiInput;
  inputResolutionController;
  outputStrideController;
  multiplierController;
  quantBytesController;
  architectureController;
  algorithmController;

  defaultMobileNetMultiplier: MobileNetMultiplier = isMobile() ? 0.5 : 0.75;
  defaultMobileNetStride: PoseNetOutputStride = 16;
  defaultMobileNetInputResolution = 500;

  defaultResNetMultiplier = 1.0;
  defaultResNetStride = 32;
  defaultResNetInputResolution = 250;
  animationFrame;
  guiState = {
    algorithm: 'multi-pose',
    input: {
      architecture: this.defaultArchitecture,
      outputStride: this.defaultMobileNetStride,
      inputResolution: this.defaultMobileNetInputResolution,
      multiplier: this.defaultMobileNetMultiplier,
      quantBytes: this.defaultQuantBytes,
    },
    singlePoseDetection: {
      minPoseConfidence: 0.1,
      minPartConfidence: 0.5,
    },
    multiPoseDetection: {
      maxPoseDetections: 5,
      minPoseConfidence: 0.15,
      minPartConfidence: 0.1,
      nmsRadius: 30.0,
    },
    output: {
      showVideo: true,
      showSkeleton: true,
      showPoints: true,
      showBoundingBox: false,
    },
    net: null,
    camera: null,
    architecture: null,
    changeToArchitecture: null,
    inputResolution: null,
    changeToInputResolution: null,
    outputStride: null,
    changeToOutputStride: null,
    multiplier: null,
    changeToMultiplier: null,
    quantBytes: null,
    changeToQuantBytes: null,
  };
  constructor() {}

  async ngOnInit() {
    toggleLoadingUI(true);
    const net = await posenet.load({
      architecture: this.guiState.input.architecture,
      outputStride: this.defaultMobileNetStride, // this.guiState.input.outputStride,
      inputResolution: this.guiState.input.inputResolution,
      multiplier: this.guiState.input.multiplier,
      quantBytes: this.guiState.input.quantBytes,
    });
    toggleLoadingUI(false);

    // let video;

    try {
      this.video = await this.loadVideo();
    } catch (e) {
      const info = document.getElementById('info') as HTMLDivElement;
      info.textContent =
        'this browser does not support video capture,' +
        'or this device does not have a camera';
      info.style.display = 'block';
      throw e;
    }

    this.setupGui([], net);
    this.updateGui();
    this.guiInput.open();
    this.setupFPS();
    this.poseDetectionFrame();
    // this.detectPoseInRealTime(video);
  }

  async setupCamera() {
    const browser: any = navigator;
    browser.getUserMedia =
      browser.getUserMedia ||
      browser.webkitGetUserMedia ||
      browser.mozGetUserMedia ||
      browser.msGetUserMedia;
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error(
        'Browser API navigator.mediaDevices.getUserMedia not available'
      );
    }

    // const video = this.videoElement.nativeElement;
    const video = document.getElementById('video') as HTMLVideoElement;
    video.width = this.videoWidth;
    video.height = this.videoHeight;

    const mobile = isMobile();
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        facingMode: 'user',
        width: mobile ? undefined : this.videoWidth,
        height: mobile ? undefined : this.videoHeight,
      },
    });
    video.srcObject = stream;
    return new Promise((resolve) => {
      video.onloadedmetadata = () => {
        resolve(video);
      };
    });
  }

  async loadVideo() {
    const video: any = await this.setupCamera();
    video.play();

    return video;
  }

  /**
   * Sets up dat.gui controller on the top-right of the window
   */
  setupGui(cameras, net) {
    this.guiState.net = net;

    if (cameras.length > 0) {
      this.guiState.camera = cameras[0].deviceId;
    }

    const gui = new dat.GUI({ width: 300 });

    this.guiState[tryResNetButtonName] = () => {
      this.architectureController.setValue('ResNet50');
    };
    gui.add(this.guiState, tryResNetButtonName).name(tryResNetButtonText);
    updateTryResNetButtonDatGuiCss();

    // The single-pose algorithm is faster and simpler but requires only one
    // person to be in the frame or results will be innaccurate. Multi-pose works
    // for more than 1 person
    this.algorithmController = gui.add(this.guiState, 'algorithm', [
      'single-pose',
      'multi-pose',
    ]);

    // The input parameters have the most effect on accuracy and speed of the
    // network
    this.guiInput = gui.addFolder('Input');
    // Architecture: there are a few PoseNet models varying in size and
    // accuracy. 1.01 is the largest, but will be the slowest. 0.50 is the
    // fastest, but least accurate.
    this.architectureController = this.guiInput.add(
      this.guiState.input,
      'architecture',
      ['MobileNetV1', 'ResNet50']
    );

    this.architectureController.onChange((architecture) => {
      // if architecture is ResNet50, then show ResNet50 options
      this.updateGui();
      this.guiState.changeToArchitecture = architecture;
    });

    this.guiState.architecture = this.guiState.input.architecture;

    let single = gui.addFolder('Single Pose Detection');
    single.add(
      this.guiState.singlePoseDetection,
      'minPoseConfidence',
      0.0,
      1.0
    );
    single.add(
      this.guiState.singlePoseDetection,
      'minPartConfidence',
      0.0,
      1.0
    );

    let multi = gui.addFolder('Multi Pose Detection');
    multi
      .add(this.guiState.multiPoseDetection, 'maxPoseDetections')
      .min(1)
      .max(20)
      .step(1);
    multi.add(this.guiState.multiPoseDetection, 'minPoseConfidence', 0.0, 1.0);
    multi.add(this.guiState.multiPoseDetection, 'minPartConfidence', 0.0, 1.0);
    // nms Radius: controls the minimum distance between poses that are returned
    // defaults to 20, which is probably fine for most use cases
    multi.add(this.guiState.multiPoseDetection, 'nmsRadius').min(0.0).max(40.0);
    multi.open();

    let output = gui.addFolder('Output');
    output.add(this.guiState.output, 'showVideo');
    output.add(this.guiState.output, 'showSkeleton');
    output.add(this.guiState.output, 'showPoints');
    output.add(this.guiState.output, 'showBoundingBox');
    output.open();

    this.algorithmController.onChange((value) => {
      switch (this.guiState.algorithm) {
        case 'single-pose':
          multi.close();
          single.open();
          break;
        case 'multi-pose':
          single.close();
          multi.open();
          break;
      }
    });
  }

  updateGuiInputResolution(inputResolution, inputResolutionArray) {
    // Input resolution:  Internally, this parameter affects the height and width
    // of the layers in the neural network. The higher the value of the input
    // resolution the better the accuracy but slower the speed.

    if (this.inputResolutionController) {
      this.inputResolutionController.remove();
    }
    this.guiState.inputResolution = inputResolution;
    this.guiState.input.inputResolution = inputResolution;
    this.inputResolutionController = this.guiInput.add(
      this.guiState.input,
      'inputResolution',
      inputResolutionArray
    );
    this.inputResolutionController.onChange((inputRes) => {
      this.guiState.changeToInputResolution = inputRes;
    });
  }

  updateGuiOutputStride(outputStride, outputStrideArray) {
    // Output stride:  Internally, this parameter affects the height and width of
    // the layers in the neural network. The lower the value of the output stride
    // the higher the accuracy but slower the speed, the higher the value the
    // faster the speed but lower the accuracy.

    if (this.outputStrideController) {
      this.outputStrideController.remove();
    }
    this.guiState.outputStride = outputStride;
    this.guiState.input.outputStride = outputStride;
    this.outputStrideController = this.guiInput.add(
      this.guiState.input,
      'outputStride',
      outputStrideArray
    );
    this.outputStrideController.onChange((outStride) => {
      this.guiState.changeToOutputStride = outStride;
    });
  }

  updateGuiMultiplier(multiplier, multiplierArray) {
    // Multiplier: this parameter affects the number of feature map channels in
    // the MobileNet. The higher the value, the higher the accuracy but slower the
    // speed, the lower the value the faster the speed but lower the accuracy.
    if (this.multiplierController) {
      this.multiplierController.remove();
    }
    this.guiState.multiplier = multiplier;
    this.guiState.input.multiplier = multiplier;
    this.multiplierController = this.guiInput.add(
      this.guiState.input,
      'multiplier',
      multiplierArray
    );
    this.multiplierController.onChange((multipl) => {
      this.guiState.changeToMultiplier = multipl;
    });
  }

  updateGuiQuantBytes(quantBytes, quantBytesArray) {
    // QuantBytes: this parameter affects weight quantization in the ResNet50
    // model. The available options are 1 byte, 2 bytes, and 4 bytes. The higher
    // the value, the larger the model size and thus the longer the loading time,
    // the lower the value, the shorter the loading time but lower the accuracy.
    if (this.quantBytesController) {
      this.quantBytesController.remove();
    }

    this.guiState.quantBytes = +quantBytes;
    this.guiState.input.quantBytes = quantBytes + 1;
    this.quantBytesController = this.guiInput.add(
      this.guiState.input,
      'quantBytes',
      quantBytesArray
    );
    this.quantBytesController.onChange((quantByt) => {
      this.guiState.changeToQuantBytes = +quantByt;
    });
  }

  updateGui() {
    if (this.guiState.input.architecture === 'MobileNetV1') {
      this.updateGuiInputResolution(this.defaultMobileNetInputResolution, [
        200,
        250,
        300,
        350,
        400,
        450,
        500,
        550,
        600,
        650,
        700,
        750,
        800,
      ]);
      this.updateGuiOutputStride(this.defaultMobileNetStride, [8, 16]);
      this.updateGuiMultiplier(this.defaultMobileNetMultiplier, [
        0.5,
        0.75,
        1.0,
      ]);
    } else {
      // guiState.input.architecture === "ResNet50"
      this.updateGuiInputResolution(this.defaultResNetInputResolution, [
        200,
        250,
        300,
        350,
        400,
        450,
        500,
        550,
        600,
        650,
        700,
        750,
        800,
      ]);
      this.updateGuiOutputStride(this.defaultResNetStride, [32, 16]);
      this.updateGuiMultiplier(this.defaultResNetMultiplier, [1.0]);
    }
    this.updateGuiQuantBytes(this.defaultQuantBytes, [1, 2, 4]);
  }

  /**
   * Feeds an image to posenet to estimate poses - this is where the magic
   * happens. This function loops with a requestAnimationFrame method.
   */
  detectPoseInRealTime(video) {
    // const canvas = document.getElementById('output') as HTMLCanvasElement;
    // const ctx = canvas.getContext('2d');
    // // since images are being fed from a webcam, we want to feed in the
    // // original image and then just flip the keypoints' x coordinates. If instead
    // // we flip the image, then correcting left-right keypoint pairs requires a
    // // permutation on all the keypoints.
    // const flipPoseHorizontal = true;
    // canvas.width = this.videoWidth;
    // canvas.height = this.videoHeight;
    // this.poseDetectionFrame(ctx, video, flipPoseHorizontal);
  }

  async poseDetectionFrame() {
    const canvas = document.getElementById('output') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    // since images are being fed from a webcam, we want to feed in the
    // original image and then just flip the keypoints' x coordinates. If instead
    // we flip the image, then correcting left-right keypoint pairs requires a
    // permutation on all the keypoints.
    const flipPoseHorizontal = true;

    canvas.width = this.videoWidth;
    canvas.height = this.videoHeight;
    ctx.clearRect(0, 0, this.videoWidth, this.videoHeight);

    if (this.guiState.output.showVideo) {
      ctx.save();
      ctx.scale(-1, 1);
      ctx.translate(-this.videoWidth, 0);
      ctx.drawImage(this.video, 0, 0, this.videoWidth, this.videoHeight);
      ctx.restore();
    }
    if (this.guiState.changeToArchitecture) {
      // Important to purge variables and free up GPU memory
      this.guiState.net.dispose();
      toggleLoadingUI(true);
      this.guiState.net = await posenet.load({
        architecture: this.guiState.changeToArchitecture,
        outputStride: this.guiState.outputStride,
        inputResolution: this.guiState.inputResolution,
        multiplier: this.guiState.multiplier,
      });
      toggleLoadingUI(false);
      this.guiState.architecture = this.guiState.changeToArchitecture;
      this.guiState.changeToArchitecture = null;
    }
    if (this.guiState.changeToMultiplier) {
      this.guiState.net.dispose();
      toggleLoadingUI(true);
      this.guiState.net = await posenet.load({
        architecture: this.guiState.architecture,
        outputStride: this.guiState.outputStride,
        inputResolution: this.guiState.inputResolution,
        multiplier: this.guiState.changeToMultiplier + 1,
        quantBytes: this.guiState.quantBytes,
      });
      toggleLoadingUI(false);
      this.guiState.multiplier = +this.guiState.changeToMultiplier;
      this.guiState.changeToMultiplier = null;
    }

    if (this.guiState.changeToOutputStride) {
      // Important to purge variables and free up GPU memory
      this.guiState.net.dispose();
      toggleLoadingUI(true);
      this.guiState.net = await posenet.load({
        architecture: this.guiState.architecture,
        outputStride: this.guiState.changeToOutputStride + 1,
        inputResolution: this.guiState.inputResolution,
        multiplier: this.guiState.multiplier,
        quantBytes: this.guiState.quantBytes,
      });
      toggleLoadingUI(false);
      this.guiState.outputStride = +this.guiState.changeToOutputStride;
      this.guiState.changeToOutputStride = null;
    }

    if (this.guiState.changeToInputResolution) {
      // Important to purge variables and free up GPU memory
      this.guiState.net.dispose();
      toggleLoadingUI(true);
      this.guiState.net = await posenet.load({
        architecture: this.guiState.architecture,
        outputStride: this.guiState.outputStride,
        inputResolution: +this.guiState.changeToInputResolution,
        multiplier: this.guiState.multiplier,
        quantBytes: this.guiState.quantBytes,
      });
      toggleLoadingUI(false);
      this.guiState.inputResolution = +this.guiState.changeToInputResolution;
      this.guiState.changeToInputResolution = null;
    }

    if (this.guiState.changeToQuantBytes) {
      // Important to purge variables and free up GPU memory
      this.guiState.net.dispose();
      toggleLoadingUI(true);
      this.guiState.net = await posenet.load({
        architecture: this.guiState.architecture,
        outputStride: this.guiState.outputStride,
        inputResolution: this.guiState.inputResolution,
        multiplier: this.guiState.multiplier,
        quantBytes: this.guiState.changeToQuantBytes,
      });
      toggleLoadingUI(false);
      this.guiState.quantBytes = this.guiState.changeToQuantBytes;
      this.guiState.changeToQuantBytes = null;
    }

    // Begin monitoring code for frames per second
    this.stats.begin();

    let poses = [];
    let minPoseConfidence;
    let minPartConfidence;
    switch (this.guiState.algorithm) {
      case 'single-pose':
        const pose = await this.guiState.net.estimatePoses(this.video, {
          flipHorizontal: flipPoseHorizontal,
          decodingMethod: 'single-person',
        });
        poses = poses.concat(pose);
        minPoseConfidence = +this.guiState.singlePoseDetection
          .minPoseConfidence;
        minPartConfidence = +this.guiState.singlePoseDetection
          .minPartConfidence;
        break;
      case 'multi-pose':
        const alPoses = await this.guiState.net.estimatePoses(this.video, {
          flipHorizontal: flipPoseHorizontal,
          decodingMethod: 'multi-person',
          maxDetections: this.guiState.multiPoseDetection.maxPoseDetections,
          scoreThreshold: this.guiState.multiPoseDetection.minPartConfidence,
          nmsRadius: this.guiState.multiPoseDetection.nmsRadius,
        });

        poses = poses.concat(alPoses);
        minPoseConfidence = +this.guiState.multiPoseDetection.minPoseConfidence;
        minPartConfidence = +this.guiState.multiPoseDetection.minPartConfidence;
        break;
    }

    ctx.clearRect(0, 0, this.videoWidth, this.videoHeight);

    if (this.guiState.output.showVideo) {
      ctx.save();
      ctx.scale(-1, 1);
      ctx.translate(-this.videoWidth, 0);
      ctx.drawImage(this.video, 0, 0, this.videoWidth, this.videoHeight);
      ctx.restore();
    }

    // For each pose (i.e. person) detected in an image, loop through the poses
    // and draw the resulting skeleton and keypoints if over certain confidence
    // scores
    poses.forEach(({ score, keypoints }) => {
      if (score >= minPoseConfidence) {
        if (this.guiState.output.showPoints) {
          drawKeypoints(keypoints, minPartConfidence, ctx);
        }
        if (this.guiState.output.showSkeleton) {
          drawSkeleton(keypoints, minPartConfidence, ctx);
        }
        if (this.guiState.output.showBoundingBox) {
          drawBoundingBox(keypoints, ctx);
        }
      }
    });

    // End monitoring code for frames per second
    this.stats.end();
    // const ps = this.poseDetectionFrame.bind(this);
    // requestAnimationFrame(ps);
    this.animationFrame = requestAnimationFrame(() => {
      this.poseDetectionFrame();
    });
    // window.requestAnimationFrame(this.poseDetectionFrame);
  }

  /**
   * Sets up a frames per second panel on the top-left of the window
   */
  setupFPS() {
    this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.getElementById('main').appendChild(this.stats.dom);
  }
}
