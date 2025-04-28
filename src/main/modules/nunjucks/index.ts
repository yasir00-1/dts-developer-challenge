import * as path from 'path';
import * as express from 'express';
import * as nunjucks from 'nunjucks';

export class Nunjucks {
  constructor(public developmentMode: boolean) {
    this.developmentMode = developmentMode;
  }

  enableFor(app: express.Express): void {
    // tell Express to use .njk files
    app.set('view engine', 'njk');

    // configure and capture the environment
    const env = nunjucks.configure(
      path.join(__dirname, '..', '..', 'views'),
      {
        autoescape: true,
        watch: this.developmentMode,
        express: app,
      }
    );

    // register a simple `date` filter
    env.addFilter('date', (input: string | Date, format?: string) => {
      const d = input instanceof Date ? input : new Date(input);
      if (isNaN(d.getTime())) {
        return '';
      }
      // support a few common formats
      if (format === 'YYYY-MM-DD') {
        return d.toISOString().split('T')[0];
      } else if (format === 'short') {
        return d.toLocaleDateString();
      }
      // default: full UK-style date
      return d.toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    });

    // carry along your existing middleware
    app.use((req, res, next) => {
      res.locals.pagePath = req.path;
      next();
    });
  }
}
