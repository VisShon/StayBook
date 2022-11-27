import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'
import blockContent from './blockContent'
import post from './post'
import tourPackage from './package'
import hotel from './hotel'
import amenety from './amenety'
import offer from './offer'
import navoptions from './navOptions'

export default createSchema({
    name: 'default',
    types: schemaTypes.concat([
        post,
        tourPackage,
        hotel,
        amenety,
        offer,
        navoptions,
        blockContent,
    ]),
})
