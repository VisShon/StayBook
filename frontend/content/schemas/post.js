export default {
    name: 'post',
    title: 'Post',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
        },
        {
            name: 'mainImage',
            title: 'Main image',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'images',
            title: 'Images',
            type: 'array',
            of: [
                {
                    name: 'image',
                    title: 'Image',
                    type: 'image'
                }
            ]
        },
        {
            name: 'publishedAt',
            title: 'Published at',
            type: 'datetime',
        },
        {
            name: 'body',
            title: 'Body',
            type: 'blockContent'
        },
        {
            name: 'description',
            title: 'Description',
            type: 'string',
        },
        {
            name: 'bullet_points',
            title: 'Content',
            type: 'array',
            of: [
                {
                    name: 'paragraph',
                    title: 'Para',
                    type: 'object',
                    fields: [
                        {
                            name: 'heading',
                            title: 'Heading',
                            type: 'string'
                        },
                        {
                            name: 'heading_content',
                            title: 'Content',
                            type: 'string'
                        }
                    ]
                },
            ]
        }
    ],

    preview: {
        select: {
            title: 'title',
            media: 'mainImage',
        },
        prepare(selection) {
            return Object.assign({}, selection, {})
        },
    },
}
