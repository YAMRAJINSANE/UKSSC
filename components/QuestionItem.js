import  sanityClient from '@sanity/client'



const client = sanityClient({
  projectId: 'j856t9gr',
  dataset: 'production',
  apiVersion: '2023-01-30', // use current UTC date - see "specifying API version"!
   // or leave blank for unauthenticated usage
  useCdn: true,  // `false` if you want to ensure fresh data
})

export default client
