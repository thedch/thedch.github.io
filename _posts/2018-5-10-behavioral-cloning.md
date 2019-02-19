---
layout:     post
title:      Behavioral Cloning using Keras
---

I finished the Behavioral Cloning project in the Udacity Self Driving Car nanodegree about a month ago, and I've been meaning to write about it. It was a great experience and I learned some key lessons.

As always, my code can be found on my [GitHub](https://github.com/thedch/behavioral-cloning-neural-net).

# The problem

Given a 3D vehicle simulator where you can control steering and velocity, how can you navigate autonomously around a track? Traditional computer vision techniques might work: color space transforms, gradients, or line detection could be used to analyze what's in front of the car, and take action based on that. Reinforcement learning could also be used: we can run the simulator some hundreds or thousands of times in parallel on a supercomputer, giving the system some reward / penalty system, and allowing it to 'learn' how to drive. Here's how I solved it:

## Behavioral Cloning

Instead of starting from scratch in the reinforcement learning example, we can gather human training data, and learn based on that. The simulator has a 'recording' mode, where it records the current steering angle, current velocity, and three pictures at each time step. The three pictures are from a dashcam perspective, one angled slightly left, one pointing straight, and one angled slightly right.

Using these pictures as the input to a neural network, and steering angle as the output, we can train a network to steer the car in real time. At this point I should mention NVIDIA's [excellent paper](https://devblogs.nvidia.com/deep-learning-self-driving-cars/) on this topic. The network discussed in that paper heavily inpsired my final network architecture.

Let's look at the implementation.

### Data preprocessing

First up: data augmentation to increase dataset size and reduce overfitting. An obvious choice here is mirroring: if a given image is associated with a steering angle of `x`, the mirrored image has a steering angle of `-x`. This doubles our dataset size.

Secondly, I can take advantage of the previously mentioned three pictures that are taken at each timestep. The camera pointing forward should be associated with the steering angle the car was given at that timestep, but the other two images are not so simple. We need to offset the steering angle for the two angled cameras -- if the camera is angled slightly left, the steering angle it is associated with should be slightly more to the right. Using three images at each timestep instead of one allows us to triple our dataset.

The original training dataset I used had about 8,000 images, and after 6x'ing the size, it was about 50,0000. Loading all of this into memory at once is a bad idea, so generators came in handy here.

### The network architecture

Using mean squared error as a loss function and the Adam optimizer, I implemented the previously mentioned NVIDIA model for vehicle control. The first layer crops off the hood and sky, as it is of little interest, and then each image is passed through a series of convolutional and fully connected layers before finally outputting a single number: the steering angle.

Once the network was trained using a standard 80/20 train/validation split, I used the `.h5` file to predict the steering angle at each time step while running the simulator.

One interesting note: when running a screen recorder, I saw a significant decrease in autonomous performance. It seemed like the processor was slowed down to the point that the control loop was no longer fast enough to properly control the car -- I had to take a video with my phone instead of using a screen recorder. The drawbacks of integrated graphics, I guess.
