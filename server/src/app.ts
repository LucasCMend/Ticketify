import express from 'express';
import type { Request, Response } from 'express';

const app = express();

// Middlewares globais
app.use(express.json()); // Permite que a API receba dados em formato JSON

// Rota de Health Check (Teste)
app.get('/ping', (req: Request, res: Response) => {
  res.json({ message: 'A API de Ingressos está no ar! 🚀' });
});

// Futuramente, vamos importar e usar nossas rotas reais aqui
// app.use('/users', userRoutes);
// app.use('/events', eventRoutes);

export default app;