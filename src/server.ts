import app from './app';

try {
  app.listen(3333);
  console.log(`App is listening to port 3333 on ${process.env.NODE_ENV}`);
} catch (error) {
  console.log(error);
}
