export const Routes = [
    {
        path: '/',
        component: 'blit-layout',
        action: async () => { /* await import('./elements'); */ await import('./main-layout'); },
        children:
            [
                {
                    path: '/:static',
                    component: 'static-content',
                    action: async () => { await import('./elements/static-content'); },
                }       
            ]
    }
];

