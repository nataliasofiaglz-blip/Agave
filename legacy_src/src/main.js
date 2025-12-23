import { Router } from './core/Router.js';
import { Home } from './pages/Home.js';
import { Generator } from './pages/Generator.js';
import { Progress } from './pages/Progress.js';
import { Player } from './pages/Player.js';

const routes = {
    '/': Home,
    '/generate': Generator,
    '/progress': Progress,
    '/player': Player,
    '/404': Home
};

// Initialize App
const router = new Router(routes);
