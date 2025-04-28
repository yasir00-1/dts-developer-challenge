import { Application, Request, Response } from 'express';
import axios from 'axios';

const API_BASE = process.env.API_BASE || 'http://localhost:4000';


export default function mountCaseRoute(app: Application): void {
    app.get('/cases', async (req, res, next) => {
        try {
          const { data } = await axios.get('http://localhost:4000/cases');
          return res.render('cases', { cases: data });
        } catch (err) {
          console.error('💥 /cases route threw:', err);
          return next(err);         // hand off to your app.use(errorHandler)
        }
      });

  // Show form for new case
  app.get('/cases/new', (req, res) => {
    res.render('case-form', { caseItem: {}, action: '/cases' });
  });

  // Create case
  app.post('/cases', async (req: Request, res: Response) => {
    try {
      await axios.post(`${API_BASE}/cases`, {
        title:         req.body.title,
        description:   req.body.description,
        caseNumber:    req.body.caseNumber,
        status:        req.body.status,
        dueDateTime:   req.body.dueDateTime
      });
      res.redirect('/cases');
    } catch (err) {
      console.error(err);
      res.render('case-form', { caseItem: req.body, error: 'Unable to save', action: '/cases' });
    }
  });

  // Show edit form
  app.get('/cases/:id/edit', async (req, res) => {
    try {
      const { data: caseItem } = await axios.get(`${API_BASE}/cases/${req.params.id}`);
      res.render('case-form', { caseItem, action: `/cases/${req.params.id}/edit` });
    } catch (err) {
      console.error(err);
      res.redirect('/cases');
    }
  });

  app.get('/cases/:id', async (req, res) => {
    try {
      const { data: caseItem } = await axios.get(`${API_BASE}/cases/${req.params.id}`);
      res.render('case-details', { caseItem, action: `/cases/${req.params.id}/update-status` });
    } catch (err) {
      console.error('Error fetching case:', err);
      res.redirect('/cases');
    }
  });

  // Update status

app.post('/cases/:id/update-status', async (req, res) => {
    try {
      const { status } = req.body;
      await axios.get(`${API_BASE}/cases/${req.params.id}/status`, {
        params: { status }
      });
      res.redirect(`/cases/${req.params.id}?success=Status updated successfully`);
    } catch (err) {
      console.error('Error updating status:', err);
      res.redirect('/cases');
    }
  });
  

// Delete case
app.post('/cases/:id/delete', async (req, res) => {
    try {
      await axios.delete(`${API_BASE}/cases/${req.params.id}`);
      res.redirect('/cases?success=Case deleted successfully');
    } catch (err) {
      console.error('Error deleting case:', err);
      res.redirect('/cases');
    }
  });
}  
