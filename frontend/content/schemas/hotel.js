export default {
    name: 'hotel',
    title: 'Hotel',
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
            name: 'phone',
            title: 'Phone',
            type: 'string',
        },
        {
            name: 'map',
            title: 'Map Link',
            type: 'url',
        },
        {
            name: 'address',
            title: 'Address',
            type: 'string',
        },
        {
            name: 'amenities',
            title: 'Amenities',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'amenety' } }],
        },
        {
            name: 'description',
            title: 'Description',
            type: 'string',
        },
        {
            name: 'email',
            title: 'Email',
            type: 'string',
        },
        {
            name: 'images',
            title: 'Images',
            type: 'array',
            of: [{ type: 'image', options: { hotspot: true } }],
        },
        {
            name: 'rooms',
            title: 'Rooms',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'type',
                            title: 'Type',
                            type: 'string',
                        },
                        {
                            name: 'ameneties',
                            title: 'Ameneties',
                            type: 'string',
                        },
                        {
                            name: 'info',
                            title: 'Info',
                            type: 'string',
                        },
                        {
                            name: 'description',
                            title: 'Description',
                            type: 'string',
                        },
                        {
                            name: 'totalRooms',
                            title: 'Total Rooms',
                            type: 'number',
                        },
                        {
                            name: 'guests',
                            title: 'Total Guests',
                            type: 'number',
                        },
                        {
                            name: 'image',
                            title: 'Image',
                            type: 'image',
                        },
                        {
                            name: 'images',
                            title: 'Images',
                            type: 'array',
                            of: [{ type: 'image', options: { hotspot: true } }],
                        },
                        {
                            name: 'plans',
                            title: 'Plans',
                            type: 'array',
                            of: [
                                {
                                    type: 'object',
                                    fields: [
                                        {
                                            name: 'title',
                                            title: 'Title',
                                            type: 'string',
                                        },
                                        {
                                            name: 'price',
                                            title: 'Price',
                                            type: 'number',
                                        },
                                        {
                                            name: 'info',
                                            title: 'Info',
                                            type: 'string',
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ],

    preview: {
        select: {
            title: 'name',
            media: 'images',
        },
        prepare(selection) {
            return Object.assign({}, selection)
        },
    },
}
