import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Página de administração');
})

router.get('/posts', (req, res) => {
    res.send('Pagina de Posts');
})

router.get('/categorias', (req, res) => {
    res.send('Página de Categorias');
})

export default router;