---
layout:     post
title:      Mapping an indoor environment with LiDAR and ROS
---

In my previous post, I showed a video of our robot struggling to navigate to its destination. I had a few theories regarding the root cause of our issues, and my main theory was the PID controller. In this post I'll discuss how we solved our PID control issues, and the results.

But first -- a brief celebration. Our team has been recognized by the University for our technical achievements: we have received the Deans' award! This award is given to the top 10 undergraduate projects in each discipline. As such, we have been recognized as a top 10 undergraduate engineering project for this academic year. There are subsequent awards we can receive (top 3, best overall), which have yet to be released. However, to be in the top 10 alone is very exciting, I'm very humbled.

Now, back to the robot:

Originally, we were using the ROS PID controller, written in Python. This created three problems:
1. Python is slow
2. The PID controller was running on the Pi, which was already computationally overloaded with the localization and navigation algorithms
3. We didn't write the PID controller, we just tuned it. As such, the design wasn't specifically suited to our needs

The solution to all three of these issues: rewrite the PID controller in C++ on the Teensy 3.6. PID is a very "solved" problem, so this wasn't difficult, and it was a good exercise. The actual implementation isn't that interesting -- we have an interrupt that reads from the encoders every 7ms (we tried a range of values, and this seemed to be the best), and another interrupt that runs the PID calculation loop every 14ms. This puts the control loop at about 70 Hz. We could go fast if we needed, but we're limited by the speed at which the encoders can be run -- there's no point in running the PID loop faster than you can read sensor data. We're currently running our PID loop at half the speed at which we read sensor data, which leaves us a lot of room to speed up the loop, but the current loop is exhibiting satisfactory results.

Due to the modularity of ROS nodes, it was easy to swap the PID controller from the Pi to the Teensy.

When I tested the system, the improvement was instant and obvious. It was vastly smoother, more responsive, and more accurate. There was little deviation when driving straight (~18 inches over ~20 feet, largely due to encoders reading differently), and turning was snappy and accurate as well. With the control problem largely solved, it was time re-test the navigation and localization elements.

I took our robot to the first floor of the Baskin engineering building, with all the ROS nodes and web server running. Using the web interface we've developed, we input a destination goal. Here's the result (sped up 4x):

<iframe width="560" height="315" src="https://www.youtube.com/embed/5ih7AmDAokY" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

As you can see, the navigation is much more linear and decisive. However, we still have a large issue: the robot constantly pauses during navigation. Our current theory (backed up by error log analysis): the robot is unable to meet its navigation loop speed goal (15 Hz), so it pauses regularly to catch up. It's literally moving faster than it can think. There's plenty of parameters that could be causing this: our map resolution is rather high, and reducing it could solve the problem. Fixing this is our next main goal, to ensure smoother continuous navigation.

This is exciting progress, and I'll post when I have more to show.
