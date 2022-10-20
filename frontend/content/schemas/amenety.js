export default {
    name: 'amenety',
    title: 'Amenety',
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
