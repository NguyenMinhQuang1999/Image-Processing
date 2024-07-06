import request from 'supertest';
import app from '../index';
import { resizeImage } from '../utitlities';

describe('Image processing', async () => {
  it('should return 200 and if image exist', async () => {
    const fileName = 'icelandwaterfall';
    const res = await request(app).get(`/api/images?fileName=${fileName}`);
    expect(res.statusCode).toEqual(200);
  });
  it('should return 200 and if no height', async () => {
    const fileName = 'icelandwaterfall';
    const width = 100;
    const res = await request(app).get(
      `/api/images?fileName=${fileName}&width=${width}`
    );
    expect(res.statusCode).toEqual(200);
  });
  it('should return 200 and the resized image', async () => {
    const width = 100;
    const height = 100;
    const fileName = 'icelandwaterfall';
    const res = await request(app).get(
      `/api/images?width=${width}&height=${height}&fileName=${fileName}`
    );
    expect(res.statusCode).toEqual(200);
  });

  it('should return 400 if the image does not exist', async () => {
    const width = 100;
    const height = 100;
    const fileName = 'no-name';
    const res = await request(app).get(
      `/api/images?width=${width}&height=${height}&fileName=${fileName}`
    );

    expect(res.statusCode).toEqual(400);
  });
  it('should return 400 if width/height invalid', async () => {
    const width = -100;
    const height = -100;
    const fileName = 'icelandwaterfall';
    const res = await request(app).get(
      `/api/images?width=${width}&height=${height}&fileName=${fileName}`
    );

    expect(res.statusCode).toEqual(400);
  });

  it('resizeImage create a new resized image', async () => {
    const width = 500;
    const height = 500;
    const fileName = 'icelandwaterfall';
    await resizeImage({ width, height, fileName });
    expect(async () => await resizeImage({ width, height, fileName })).not.toThrow();
  });
});
