var ghpages = require('gh-pages');

ghpages.publish(
    'public', // path to public directory
    {
        branch: 'gh-pages',
        repo: 'https://github.com/flatpickles/GutenBard.git', // Update to point to your repository  
        user: {
            name: 'Matt Nichols',
            email: 'mattnichols206@gmail.com'
        }
    },
    () => {
        console.log('Deploy Complete!')
    }
)