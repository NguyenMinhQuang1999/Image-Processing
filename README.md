### Scripts
- Install: ```npm install```
- Build: ```npm run build```
- Lint: ```npm run lint```
- Prettify: ```npm run prettify```
- Run unit tests: ```npm run test```
- Start server: ```npm run start```

### Usage
The server will listen on port 3000:

#### Brief instructions
http://localhost:3000/

Expected query arguments are:
- _filename_: Available filenames are:
  - encenadaport
  - icelandwaterfall
  - icelandwaterfall
  - palmtunnel
  - santamonica
- _width_: numerical pixel value > 0
- _height_: numerical pixel value > 0


#### Example 1
http://localhost:3000/api/images?fileName=icelandwaterfall
Will display the original icelandwaterfall image.

#### Example 2
http://localhost:3000/api/images?fileName=icelandwaterfall&width=300&height=300
Will scale the icelandwaterfall image to 300 by 300 pixels and store the resulting image.
On subsequent calls will serve the resized image instead of resizing the
original again.

#### Example 3
http://localhost:3000/api/images?fileName=icelandwaterfall&width=-300&height=300
Invalid width parameter that will be hinted to.

#### Example 4
http://localhost:3000/api/images?fileName=icelandwaterfall&width=300
Missing height parameter that will be hinted to.

#### Example 5
http://localhost:3000/api/images?fileName=icelandwaterfall&height=300
Missing width parameter that will be hinted to.

