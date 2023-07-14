export const Routes = [
    {
        path: '/',
        component: 'main-layout',
        children:
            [
                {
                    path: '/',
                    redirect: '/overview'
                },
                {
                    path: '/:static',
                    component: 'static-content',
                }       
            ]
    }
];

