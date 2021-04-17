const express = require('express');
require('./mongoose/db');
const Plan = require('./mongoose/models/Plan')
const app = express();

app.use(express.json())

const port = process.env.PORT || 8080;

app.use(express.static('dist'));

app.post('/api/plans', async (req, res) => {

  const { firstname, surname } = req.body;
  const newPlan = await Plan.create({ firstname, surname })    
  res.send(newPlan);
});

app.put('/api/plans/:id', async (req, res) => {
  const id = req.params.id;
  const myPlan = await Plan.findOne({ id })
  const updatedPlan = { ...myPlan, ...req.body }
  Plan.update(id, updatedPlan);  
  res.send(updatedPlan);
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
