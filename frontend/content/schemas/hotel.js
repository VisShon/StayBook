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
            name: 'order',
            title: 'Order',
            type: 'number',
            validation: Rule => Rule.required().positive().integer()
        },
        {
            name: 'rating',
            title: 'Rating',
            type: 'number',
            validation: Rule => Rule.required().positive().integer().max(5)
        },
        {
            name: 'card_amenities',
            title: 'Card Amenities',
            type: 'string',
        },
        {
            name: 'card_amenities_ref',
            title: 'Card Amenities Icons',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'amenety' } }],
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
                                        {
                                            name: 'price_planner',
                                            title: 'Price Planner',
                                            type: 'array',
                                            of: [
                                                {
                                                    name: 'date_range',
                                                    title: 'Date Range',
                                                    type: 'object',
                                                    fields: [
                                                        {
                                                            name: 'starting_date',
                                                            title: 'Starting Date',
                                                            type: 'date',
                                                        },
                                                        {
                                                            name: 'ending_date',
                                                            title: 'Ending Date',
                                                            type: 'date',
                                                        },
                                                        {
                                                            name: 'price',
                                                            title: 'Price',
                                                            type: 'number',
                                                            validation: Rule => Rule.integer().positive()
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            name: 'features',
                                            title: 'Features',
                                            type: 'array',
                                            of: [
                                                {
                                                    name: 'feature',
                                                    title: 'Feature',
                                                    type: 'string'
                                                }
                                            ] 
                                        }
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            name: 'hotel_description',
            title: 'Hotel Description',
            type: 'array',
            of: [
                {
                    name: 'desc_point',
                    title: 'Description Point',
                    type: 'string'
                }
            ]
        },
        {
            name: 'hotel_amenities',
            title: 'Hotel Amenities',
            type: 'array',
            of: [
                {
                    name: 'amenity_name',
                    title: 'Amenity',
                    type: 'string'
                }
            ]
        },
        {
            name: 'hotel_nearby_places',
            title: 'Hotel Nearby Places',
            type: 'array',
            of: [
                {
                    name: 'place',
                    title: 'Nearby Place',
                    type: 'object',
                    fields: [
                        {
                            name: 'nearby_place_name',
                            title: 'Name',
                            type: 'string'
                        },
                        {
                            name: 'nearby_place_link',
                            title: 'Link',
                            type: 'string'
                        }
                    ]
                }
            ]
        }
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
