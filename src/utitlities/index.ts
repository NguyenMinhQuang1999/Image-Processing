import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

interface resizeParams {
  fileName: string;
  width: number;
  height: number;
}

export const resizeImage = async (params: resizeParams): Promise<string> => {
  // eslint-disable-next-line no-useless-catch
  try {
    const inputPath = path.resolve(
      __dirname,
      `../../assets/images/full/${params.fileName}.jpg`
    );

    const image = sharp(inputPath);
    const metadata = await image.metadata();
    const { width, height } = metadata;
    let widthCovernt = params.width;
    let heightCovernt = params.height;
    if (params.width && !params.height) {
      heightCovernt = height as number;
    }
    if (!params.width && params.height) {
      widthCovernt = width as number;
    }

    const outputPath = path.resolve(
      __dirname,
      `../../assets/images/thumb/${params.fileName}_${widthCovernt}x${heightCovernt}.jpg`
    );

    if (fs.existsSync(outputPath)) {
      return outputPath;
    }

    if (!params.width && !params.height && fs.existsSync(inputPath)) {
      return inputPath;
    }

    await sharp(inputPath).resize(widthCovernt, heightCovernt).toFile(outputPath);
    return outputPath;
  } catch (error) {
    console.log('Error resizeImage', error);
    throw error;
  }
};
