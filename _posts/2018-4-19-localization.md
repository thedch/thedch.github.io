---
layout:     post
title:      Localizing + Navigating an indoor environment with LiDAR and ROS
---

A few weeks ago, I posted a video of my team using LiDAR on our car to map out an indoor environment. I'm pleased to announce that the car is now a self driving car, and can successfully navigate an environment when given a starting position and a goal.

## Localization

We're using [AMCL](https://wiki.ros.org/amcl) to localize inside our environment. We've tried using other packages (Hector localization, briefly) to localize, but AMCL gives us the best results. The location we received from Hector drifted fairly quickly -- we suspect this is because Hector does not use odometry data, while AMCL does.

Here's some footage of AMCL at work, using rviz to show the map and current location:

<iframe width="560" height="315" src="https://www.youtube.com/embed/HfttQAg68jY" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

<iframe width="560" height="315" src="https://www.youtube.com/embed/5ZMLw-Dkc6c" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

There was a fair amount of tuning involved, especially with the Raspberry Pi's low computation power. Our navigation loop is running at fairly low speed, usually in the range of 4-8 Hz. We had to reduce the map size and resolution to make sure it was able to fit in memory as well.

## Navigation

The next step after localization is to actually do something with that knowledge. In our case, this means continuous actuation towards our goal, combined with continuously updating our current pose (location + orientation) using AMCL.

For navigation, we use the [move_base](https://wiki.ros.org/move_base) package. Here's a clip of our robot navigating a hallway, and then I'll discuss our current issues / goals.

<iframe width="560" height="315" src="https://www.youtube.com/embed/PoSFVHnsD58" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

We're using a distributed system model here -- the laptop running rviz (with the map) is connected to the ROS Master on the Raspberry Pi, and monitoring the robot's telemetry. Using the GUI (and soon, using our web server) we can send a destination to the robot, and it will navigate accordingly.

The first thing you probably notice is just how jumpy and circuitous it is. We believe this is largely caused by two things: a slow control loop, and bad control algorithms. We've spent a pretty significant amount of time tuning our PID controller, but it's still not able to drive in a consistently straight line when we command a forward velocity. As you can see, the navigation algorithm can compensate for this, but it's a pretty slow and inefficient process. We're exploring options and troubleshooting (how many rolling points should be used to calculate the velocity? Are the encoders accurate? (spoiler: no) Should we move the PID controller to the Teensy microcontroller instead of the Pi? etc), and we've come a long way, but it's still not ideal. Hopefully over the next week we're able to tune the control algorithms and raise the loop speed, which should result in smoother navigation.

However, even with non ideal control algorithms, I'm still somewhat impressed with our ability to navigation using a one laser 10 Hz LiDAR, and cheap motor encoders. This is mostly a testament to how far low end microcontrollers have come in the past few years, and how great ROS is.

I'll post more videos (including dynamic obstacle avoidance!) soon.



