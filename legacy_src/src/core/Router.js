export class Router {
    constructor(routes) {
        this.routes = routes;
        this.root = document.getElementById('app');
        window.addEventListener('hashchange', this.handleRoute.bind(this));

        // Initial load
        window.addEventListener('load', this.handleRoute.bind(this));
    }

    async handleRoute() {
        let hash = window.location.hash.slice(1) || '/';

        // Handle "root" empty hash
        if (hash === '') hash = '/';

        // Find matching route key
        // Check for exact match first
        let routeClass = this.routes[hash];

        // If not found, check for dynamic routes (e.g. /player/v1 starts with /player)
        if (!routeClass) {
            const keys = Object.keys(this.routes);
            for (const key of keys) {
                if (key !== '/' && hash.startsWith(key)) {
                    routeClass = this.routes[key];
                    break;
                }
            }
        }

        // Fallback
        if (!routeClass) {
            routeClass = this.routes['/404'];
        }

        if (routeClass) {
            this.root.innerHTML = '';
            const component = new routeClass();
            await component.mount(this.root);
        } else {
            console.error('Route not found');
            window.location.hash = '/';
        }
    }
}
