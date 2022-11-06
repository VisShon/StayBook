export default {
    name: 'navoptions',
    title: 'NavBarOptions',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
        },
        {
            name: 'hotels',
            title: 'Hotels',
            type: 'array',
            of:[{ type: 'reference', to: { type: 'hotel' } }]
        }
    ]
}