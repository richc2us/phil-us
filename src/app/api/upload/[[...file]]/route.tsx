// import type {NextRequest, NextApiResponse} from 'next'

// import {Server, Upload} from '@tus/server'
// import {FileStore} from '@tus/file-store'
import { NextRequest, NextResponse } from 'next/server'

/**
 * !Important. This will tell Next.js NOT Parse the body as tus requires
 * @see https://nextjs.org/docs/api-routes/request-helpers
 */
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// }

// const tusServer = new Server({
//   // `path` needs to match the route declared by the next file router
//   // ie /api/upload
//   path: '/api/upload',
//   datastore: new FileStore({directory: './files'}),
//   namingFunction(req){
//     return "/projects/folder/asd"
//   },
//   generateUrl(req, {proto, host, path , id}) {
//      id = Buffer.from(id, 'utf-8').toString('base64url')
//     return `${proto}://${host}${path}/${id}`
//   },
//   getFileIdFromRequest(req, lastPath:any) {
//     // lastPath is everything after the last `/`
//     // If your custom URL is different, this might be undefined
//     // and you need to extract the ID yourself
//     return Buffer.from(lastPath, 'base64url').toString('utf-8')
//   },
// })

const POST = (req:any, res: any) => {
    // return tusServer.handle(req, res)
    return NextResponse.json({})
}

export {
    POST
}