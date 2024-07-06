import express, { Request, Response } from 'express';
import { resizeImage } from '../utitlities';
import fs from 'fs';
import path from 'path';
const routes: express.Router = express.Router();
routes.get('/', processImages);

const _validateImage = (req: express.Request): void => {
  const height = Number(req.query.height);
  const width = Number(req.query.width);
  const fileName = req.query.fileName as string;

  const imgPath = path.resolve(
    __dirname,
    `../../assets/images/full/${fileName}.jpg`
  );

  if (!width && !height && fs.existsSync(imgPath)) {
    return;
  } else {
    if (!fs.existsSync(imgPath)) {
      throw 'Not found image';
    }
    if (width && (Number.isNaN(width) || width < 1)) {
      throw "Please pass a positive numerical value for the 'width' query segment.";
    }

    if (height && (Number.isNaN(height) || height < 1)) {
      throw "Please pass a positive numerical value for the 'height' query segment.";
    }
  }
};

const validateImage = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    _validateImage(req);
    next();
  } catch (err) {
    res.status(400).send(err);
  }
};

routes.get('/api/images', validateImage, async (req, res) => {
  const { fileName, width, height } = req.query;

  try {
    const resizedImagePath = await resizeImage({
      fileName: fileName as string,
      width: parseInt(width as string),
      height: parseInt(height as string)
    });
    res.sendFile(resizedImagePath);
  } catch (error) {
    console.log('ERROR: ', error);
    res.status(400).send(error);
  }
});

function processImages(request: Request, response: Response): void {
  response.send(`
      <h1>Image Processing</h1>
      Examples:<ul><li><a href="/api/images?fileName=palmtunnel">/api/images?fileName=palmtunnel</a></li><li><a href="/api/images?fileName=palmtunnel&width=200&height=200">/api/images?fileName=palmtunnel&width=200&height=200</a></li></ul></p>'
    `);
}

export default routes;
