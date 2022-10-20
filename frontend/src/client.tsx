import client from '@sanity/client'

export default client({
    projectId: 'fifev1uu',
    dataset: 'blogs',
    useCdn: true,
    apiVersion: '2022-09-19',
})
