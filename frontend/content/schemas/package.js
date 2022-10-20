export default {
    name: 'package',
    title: 'Package',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
        },
        {
            name: 'time',
            title: 'Time',
            type: 'string',
        },
        {
            name: 'description',
            title: 'Description',
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
            name: 'highlight',
            title: 'Highlight',
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
