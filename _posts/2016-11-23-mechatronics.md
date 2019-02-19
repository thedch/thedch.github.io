---
layout:     post
title:      Mechatronics
---

## CMPE 118 Team 7
### Daniel Hunter, William Cheng, Kenny He

Welcome to the CMPE 118 Team 7 website for Fall 2016 at UCSC. During the competition, this website was maintained with progress updates and countdown timers to deadlines. As of December 2016, the project has been completed and the class is over. The website and blog posts are preserved for anyone wishing to view them.

CMPE 118 is a mechatronics class in which students design and build a robot to complete a challenge. For the first half of the class, students work in pairs to complete four different one week long lab experiments. These labs include implementing a state machine in C for a two wheeled hardware platform with light and bumper sensors, designing and soldering a multi stage band pass filter to pick up specific frequencies of IR light but ignore others, and working in Solidworks to create various gearbox and robotic designs that students then laser cut and assemble.

After these labs, the students begin the final project. The class is broken up into teams of three, and each team designs their entire robot from scratch — building the needed circuitry and sensors, designing and assembling the frame, and writing the software. 

![robot](/assets/mechatronics/back.jpg)

### Video of our robot completing task

Initially, the robot scans the field for beacons (the IR emitters on the top of the circular target), and uses that information to find the edge of the field. Then, it tracks the tape until it finds an ammo tower (our line tracking algorithm has since been significantly optimized). Once it detects an ammo tower using the bumpers, it turns and drives past the tower.

Underneath the tower is a loop of wire with an oscillating current running through it. Using an inductor, we detect the EMF from the loop of wire, and use that to align with the ball tower. When the robot drives past the ammo tower, turns, and backs into it, it is operating solely off of data from multiple inductors placed on the base of our robot, hooked up to filters and amplifiers.

After loading ammo, the robot scans the area for beacons, and travels to one using a homing algorithm. Once it detects the target (using the tape sensor), it releases a two balls using our ball release gate. It then travels to the next target, and repeats the process.

<iframe width="560" height="315" src="https://www.youtube.com/embed/0wt9Lq0gqdc" frameborder="0" allowfullscreen></iframe>

### Class Website and Summary

The class website can be seen here: [https://classes.soe.ucsc.edu/cmpe118/Fall16/](https://classes.soe.ucsc.edu/cmpe118/Fall16/)

**A summary of the final project:** In four weeks, we designed and built a robot that navigated to an ammo tower, collected ammo from the tower, and then navigated to multiple targets and dropped ammo in those targets. In order to do this, we needed various subsystems: a drivetrain, multiple tape sensors, a track wire circuit used to align with the ammo tower, a properly filtered IR detector circuit to home in on the targets, an ammo collection and delivery system, and software to take in data from all of the sensors and manage the robot’s behavior. Specific strategies for each of these tasks can be found in our [final report](/assets/mechatronics/cmpe118.pdf).

Team 7 had three members: Kenny He, William Cheng, and Daniel Hunter. The project kicked off on November 1st, when we began our initial design and prototyping. On November 27th, we achieved our official completion checkoff. Unfortunately, that specific performance was not recorded, but it looked similar to the min spec video linked above. **Our hard work paid off, and we were the second team to finish (out of 25 teams).**

The class description of CMPE 118 at UCSC is copied below:

*Technologies involved in mechatronics (intelligent electro-mechanical systems) and techniques necessary to integrate these technologies into mechatronic systems. Topics include electronics (A/D, D/A converters, opamps, filters, power devices), software program design (event-driven programming, state machine-based design), DC and stepper motors, basic sensing, and basic mechanical design (machine elements and mechanical CAD). Combines lab component of structured assignments with a large and open-ended team project. Cannot receive credit for this course and course 218. Prerequisite(s): Electrical Engineering 101/L and Computer Engineering 12/L and Computer Engineering 100/L. Concurrent enrollment in course 118L is required. Enrollment limited to 36. G. Elkaim*

CMPE 118 is known as one of the most time intensive courses on campus. It is not uncommon for students to work 12-14 hours a day for the duration of the final project.
