# PackHacks

Hackathon Project

### Problem Statement

Motion-disabled people have hard time working on computers which are widely used these days. We are making a system in which motion-disabled people can use their eyes to select the option on the computer and can use it just like a normal person would use a computer.

### Data of wheelchair users by US Dept of Health
* 1 million wheelchair users
* 1 out of 250 persons
* 10,000 people every year are spinal cord injured
* 82% of spinal cord injuries are male
* 307,000 under age 44 use wheelchairs

### THEEYETRIBE Company

It all started seven years ago where the four founders met at the IT University of Copenhagen. The ambition was to make eye tracking available for everyone at an affordable price. Within a couple of years they were renowned as the world leading research group in low cost eye tracking. After finishing their PhD’s the four founders bought the IP from the University and formed The Eye Tribe company during their participation in the European StartupBootcamp accelerator program in 2011. [Source](http://theeyetribe.com/theeyetribe.com/about/index.html)

### THE EYE TRIBE TRACKER Description

The Eye Tribe Tracker is an eye tracking system (released in October 2013) that can calculate the location where a person is looking by means of information extracted from person’s face and eyes. The eye gaze coordinates are calculated with respect to a screen the person is looking at, and are represented by a pair of (x, y) coordinates given on the screen coordinate system. [Click here for more information](http://theeyetribe.com/dev.theeyetribe.com/dev.theeyetribe.com)

### Use Cases

#### 1. Giving quiz answers by vision
<Details>
     <p>When a question with four options is displayed, the user can look at the correct answer for 5 seconds to answer the question. User will then be asked to confirm the answer and if he will look at yes for 5 seconds, the answer would be submitted.</p>

##### Features
* It makes computer accesible to specially-abled people.
* Makes interaction possible with mere eye movement (no need of mouse or keyboard)
</Details>

#### 2. Image Analysis for Advertisements
<Details>
     <p>An advertisement image will be displayed for 5 seconds. Later, the heat map containing the analysis of where the user looks the most is displayed.</p>
     
##### Features
* It will help businesses to conduct targetted marketing.
* Can be used for deep analysis of content relevance and effectiveness

</Details>

### Technologies and Hardware

- Eye Tracker Device (Eye-Tribe) : Provides real-time data of user eye-movement on the screen
- Socket.io : Excellent technology to handle passage of real-time streaming data (30fps) between multiple levels of clients and servers
- NodeJS : Event-driven, Asynchronous backend framework for
- Ngrok : Tunneling service to communicate with remote servers
- Express : MVC in NodeJS
- Mongo : NoSQL database
- Web Frontend (Bootstrap) : Responsive grid based frontend framework
- Git : Code Versioning
- Python : Speedup development process by automating tasks

###  Hardware Specs

- Sensing happens with high-resolution infrared LED
- Sampling rate   30 Hz and 60 Hz mode
- Accuracy    0.5° (average) and 0.5 – 1 degree range
- Spatial resolution  0.1° (RMS)
- Latency     < 20 ms at 60 Hz
- Calibration     5, 9, 12 points
- Operating range     45 cm – 75 cm
- Tracking area   40 cm × 30 cm at 65 cm distance
- Screen sizes    Up to 24 inches
- API/SDK     C++, C# and Java included
- Data output     Binocular gaze data
- Dimensions  (W/H/D) 20 × 1.9 × 1.9 cm (7.9 × 0.75 × 0.75 inches)
- Weight  70 g
- Connection  USB 3.0 Superspeed

### Challenges 
- Real-time streaming data : dynamic, configurable
- Multiple levels of clients and servers
- Cross platform compatibilities 
- Programming langauge barriers
- Sockets and TCP connections : Express handling became difficult
- Eye blink and other variations
- Volume of data (30fps) : Enabling browser support for such high volume data
- Sleep : Since we are all humans  :p

### Team Information

[Riken Shah](https://github.com/rikenshah)<br>
[Ankitkumar Jain](https://github.com/ankit13jain)<br>
[Mateenrehan Shaikh](https://github.com/mateenrehan)<br>
[Azra Shaikh](https://github.com/azrasalim)<br>
