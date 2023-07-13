export const Routes = [
    {
        path: '/',
        component: 'blit-layout',
        action: async () => { /* await import('./elements'); */ await import('./main-layout'); },
        children:
            [
                {
                    path: '/',
                    component: 'index-page',
                    action: async () => { await import('./pages/index-page'); }
                },
                {
                    path: '/:static',
                    component: 'static-content',
                    action: async () => { await import('./pages/static-content'); }
                }       
            ]
    }
];

