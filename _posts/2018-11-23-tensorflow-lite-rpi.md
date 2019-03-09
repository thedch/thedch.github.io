---
layout:     post
title:      TensorFlow Lite on a Raspberry Pi
---

I recently tried to figure out how to get TensorFlow Lite inference running on a Raspberry Pi, and it took me a surprisingly amount of research and dead ends (and PRs to the Tensorflow codebase / docs to fix issues) before I figured out how to get it working. The final product is actually incredibly simple when you know what to do, but it took me long enough to figure it out that I thought I'd share.

The TensorFlow documentation is actually quite good, and I'll be linking to it regularly. The main issue I had knowing *which* documentation to read, as there's a lot of it that seems like it might be useful, but a lot of ends up sort of dead end-ish or not really relevant. I messed around with protocs and bazel for some time before realizing you really don't need to.

Note: this guide focuses on getting a **custom** model from Keras running on TensorFlow Lite. A lot of the documentation puts focus on getting a downloaded TensorFlow model onto TensorFlow Lite, which wasn't what I needed.

(The main document that ended up solving my problem is [here](https://github.com/tensorflow/tensorflow/blob/master/tensorflow/lite/g3doc/convert/python_api.md) -- definitely skim this and see if it solves your problems. It took me several days to stumble across this and it was exactly what I was looking for).

## Preparing the Pi

First up, install TensorFlow on the Pi. I didn't need to build from scratch thankfully, `pip install` works... sort of.

First up, make sure you're on Raspbian Stretch, not Raspbian Jessie. The upgrade process is fairly easy, so I'll let you google around for that if you're still on Jessie.

I followed the instructions [here](https://www.tensorflow.org/install/pip), which successfully installed, but then I got an error that led me here: https://github.com/tensorflow/tensorflow/issues/23082 -- which led me to https://github.com/PINTO0309/Tensorflow-bin -- and following his instructions solved my problem (`wget` the precompiled `.whl` and then `pip install` that).

I do advise using `venv` as recommended in the official tensorflow install guide, it really does save headaches if you screw up and need to start from scratch.

Verify your install with

```
python -c "import tensorflow as tf; tf.enable_eager_execution(); print(tf.reduce_sum(tf.random_normal([1000, 1000])))"
```

and we're on to the next step!

## Develop your model

This is mercifully simple thanks to Keras' impressively clean API.

Here's a small demo:

```python
import keras
import tensorflow as tf
from keras.models import Sequential
from keras.layers import Dense


model = Sequential()
model.add(Dense(units=64, activation='relu', input_dim=100))
model.add(Dense(units=10, activation='softmax'))

model.compile(
    loss=keras.losses.categorical_crossentropy, optimizer=keras.optimizers.SGD(lr=0.01, momentum=0.9, nesterov=True)
)

# Save both an .h5 file and a .tflite file
keras_filename = 'models/keras_model.h5'
model.save(keras_filename)

converter = tf.contrib.lite.TFLiteConverter.from_keras_model_file(keras_filename)
tflite_model = converter.convert()

with open('models/model.tflite', 'wb') as f:
    f.write(tflite_model)
```

Those last few lines are really the important bits, with the `tf.contrib.lite.TFLiteConverter` -- you can drop that at the end of really any Keras training file and it should work pretty well. (You might run into unsupported operators or similar, but beyond that it's worked just fine for me).

NOTE: TensorFlow is moving `lite` out of `contrib`. I'm using Tensorflow 1.12.0 -- if you are using a more recent version, there is a good chance that it should be `tf.lite.TFLiteConverter`.

A slightly more involved MNIST model can be found [here](https://github.com/jaredjxyz/picar/blob/4b04ec1d1188f7a40e1632526a7031356e637b3e/nn/mnist_cnn.py)

Okay, so now that you have a `.tflite` file sitting around, it's time to use it!

## Infer on the Pi

Here's a short script that's fairly self explanatory on how to run inference on the Pi:

```python
import numpy as np
import tensorflow as tf
from tqdm import tqdm

x_test, y_test = ... # load your dataset in here

# Load TFLite model and allocate tensors
interpreter = tf.contrib.lite.Interpreter(model_path="mnist_model.tflite")
interpreter.allocate_tensors()

# Get input and output tensors
input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

input_shape = input_details[0]['shape']
correct = 0

for img, label in tqdm(zip(x_test, y_test)):
    interpreter.set_tensor(input_details[0]['index'], img)

    interpreter.invoke()
    output_data = interpreter.get_tensor(output_details[0]['index'])
    if np.argmax(output_data) == np.argmax(label):
        correct += 1

print('Accuracy:', correct / len(y_test))
```

A few things to note:
- You'll obviously need to change `model_path="mnist_model.tflite"` to fit your needs
- Notice `input_shape` is an unused variable -- I left this is because it's very useful to debug data issues. I initially had an error where my data was `28x28x1` and the model was expecting `1x28x28x1` -- trivial to fix, but the only way I figured it out was by comparing the shape of `input_shape` and `img`.
- The model is outputting classification probabilities, so I'm using `np.argmax` to get the highest probability class and compare. This will vary based on your task.

Beyond that, I believe the (minimal) boilerplate largely stays the same (I'm far from an expert though). I got around 90 FPS inference on the simple MNIST model, and that's before any quantization tricks or model pruning.
