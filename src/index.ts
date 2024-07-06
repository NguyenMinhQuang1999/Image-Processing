import express, { Application } from 'express';
import * as dotenv from 'dotenv';
dotenv.config();
import routes from './router/index';
const PORT = process.env.PORT || 3000;
const app: Application = express();
app.use(routes);

app.listen(PORT, async (): Promise<void> => {
  const url: string = `\x1b[2mhttp://localhost:${PORT}\x1b[0m`;
  console.log(`Please open ${url} to review the project`);
});
export default app;
