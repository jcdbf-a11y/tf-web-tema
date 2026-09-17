import 'dontenv/config';
import express from 'express';


const app = express();
const PORT = process.env.PORT || 3000;


app.get('/status', (req, res) => {
  res.json({status: 'ok', timestamp: new Date() });
});

app.use(cors());
app.use(express.json());
app.use(logger);




if(process.env.VERCEL !=="1"){
  app.listen(PORT,() =>{
    console.log(`Servidor rodando em http://localhost:${PORT}`)
  });

}

export default app;