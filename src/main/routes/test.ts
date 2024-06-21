import { Application } from 'express';
import axios from 'axios';

export default function (app: Application): void {
  app.get('/test', async (req, res) => {
    try {
      // An example of connecting to the backend (a starting point)
      const response = await axios.get('http://localhost:4000');
      console.log(response.data);
      res.send(response.data);
    } catch (error) {
      console.error('Error making request:', error);
      res.status(500).send('Internal Server Error');
    }
  });
}
