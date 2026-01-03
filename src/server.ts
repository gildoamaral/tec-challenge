import { connectDB } from './config/db';
import { createApp } from './app';
import { env } from './config/env';

async function main() {
  await connectDB();

  const app = createApp();
  app.listen(env.PORT, () => {
    console.log(`Listening on :${env.PORT}`);
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
