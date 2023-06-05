import  sanityClient from '@sanity/client'



const client = sanityClient({
  projectId: '1xrz0qzi',
  dataset: 'production',
  apiVersion: '2023-06-05', // use current UTC date - see "specifying API version"!
   // or leave blank for unauthenticated usage
  useCdn: true,  // `false` if you want to ensure fresh data
})

export default client
