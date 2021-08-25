import * as express from 'express';
import * as ChirpRouter from './chirps';

const router = express.Router();

router.get('/hello', (req, res, next) => {
    res.json('World');
});
router.use('/chirps/', ChirpRouter.default);

export default router;