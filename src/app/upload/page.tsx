"use server"

import NewForm from "./NewForm"

// import Uppy from '@uppy/core';
// import Dashboard from '@uppy/dashboard';
// import Tus from '@uppy/tus';

// import '@uppy/core/dist/style.min.css';
// import '@uppy/dashboard/dist/style.min.css';

// new Uppy()
// 	.use(Dashboard, { inline: true, target: 'body' })
// 	.use(Tus, { endpoint: '/api/upload/', storeFingerprintForResuming : true });


// import  fs  from 'fs';
// import {Upload} from "tus-js-client"

export default async function() {
    return <NewForm/>
    // const path = process.cwd() + '/README.md'
    // const file = await fs.createReadStream(path)
    // const options = {
    //   endpoint: 'http://localhost:4000/api/upload',
    //   metadata: {
    //     filename: 'README.md',
    //     filetype: 'text/plain',
    //   },
    //   onError(error:any) {
    //     console.error('An error occurred:')
    //     console.error(error)
    //     process.exitCode = 1
    //   },
    //   onProgress(bytesUploaded:any, bytesTotal:any) {
    //     const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2)
    //     console.log(bytesUploaded, bytesTotal, `${percentage}%`)
    //   },
    //   onSuccess() {
    //     console.log('Upload finished:', upload.url)
    //   },
    // }
    
    // const upload = new Upload(file, options)
    // upload.start()

    
}
