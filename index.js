import  express, {json}  from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(json());

const users = [];
const tweets = [
  {
    username: "bobesponja",
    avatar: "https://cdns-images.dzcdn.net/images/artist/77220ccb5a36d0e5df2c9e47f2c89de4/500x500.jpg",
    tweet: "eu amo o hub"
  }
];

app.post('/sign-up', (req, res) => {
    const body = req.body;
    const novoUsuario = {
        username: body.username,
        avatar: body.avatar
    }
    users.push(novoUsuario);
    res.send("ok");
  });

  app.get('/tweets', (req,res) => {
    if(tweets.length > 10){
      const mostrarTweets = tweets.slice(tweets.length - 10);
      res.send(mostrarTweets);
    } else{
      res.send(tweets);
    }
  });
  
  app.post('/tweets', (req,res) => {
    const body = req.body;
    const getAvatar = users.filter(user => {
      if(user.username === body.username){ 
        return user.avatar;
      }
    });
    const avatar = getAvatar[0].avatar;
      const newTweet = {
          username: body.username,
          avatar,
          tweet: body.tweet
      }
      tweets.push(newTweet);
      res.send("ok");
  });
  
  const port = process.env.PORT || 5000;
  app.listen(port, () => console.log(`Servidor em pé na porta ${port}`));