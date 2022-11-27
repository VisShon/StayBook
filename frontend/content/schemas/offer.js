export default {
    name: 'offer',
    title: 'Offer',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
        },
        {
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'description',
            title: 'Description',
            type: 'string',
        },
        
    ],
    preview: {
        select: {
            title: 'name',
            media: 'image',
        },
        prepare(selection) {
            return Object.assign({}, selection)
        },
    },
}

