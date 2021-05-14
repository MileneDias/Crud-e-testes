import app from './app';

app.listen(process.env.PORT, () => {
    console.info(`Server is up and running. Port ${process.env.PORT}.`);
});