const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const path = require('path');


const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'static')));

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, "static", "index.html"));
});

app.post('/api/download/', (req, res) => {   

    const url = req.body.url;
    const newPath = path.join(__dirname + "/yt-dlp");
    const envSet = `set PATH=%PATH%;${newPath}`;
    const dldCommand = `yt-dlp "${url}" -f "best[ext=mp4]" -o "${__dirname}/outputs/%(title)s.%(ext)s"`;
    const finalCommand = `${envSet} | ${dldCommand}`
    const destination = path.join(__dirname, "outputs");

    console.log(url, "sendo baixado em ", destination);

    exec(finalCommand, (err, stdout) => {

        console.log("Baixando!");

        if(err) {
            console.log("ERROR - ", err);
        }

        res.status(200).json({location: destination});

        console.log(stdout);
    });

});



app.listen(7781, () => {
    console.log("Servidor Rodando");
});
