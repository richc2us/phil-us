"use client"

import Uppy from '@uppy/core';
// import Dashboard from '@uppy/dashboard'
import '@uppy/core/dist/style.min.css';
// import '@uppy/dashboard/dist/style.min.css';
// import XHRUpload from "@uppy/xhr-upload";
import { useState } from 'react';
import { useUppyState, Dashboard  } from '@uppy/react';
import Tus from '@uppy/tus';

import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';
import GoldenRetriever from '@uppy/golden-retriever';
// import '@uppy/webcam/dist/style.min.css';

const MainUppy = new Uppy()
// .use(new Dashboard, { inline: true, target: 'body' })
.use(Tus, { endpoint: 'https://tusd.tusdemo.net/files/', storeFingerprintForResuming : true })
// .use(GoldenRetriever,{ serviceWorker: true })
// .use(XHRUpload,  { endpoint: 'https://tusd.tusdemo.net/files/' })

// MainUppy.on('file-removed', () => {alert('asd')});

export default function() {
  const [uppy] = useState(() => MainUppy);

// const files = useUppyState(uppy, (state) => state.files);
// const totalProgress = useUppyState(uppy, (state) => state.totalProgress);
// We can also get specific plugin state.
// Note that the value on `plugins` depends on the `id` of the plugin.
// const metaFields = useUppyState(
// 	uppy,
// 	(state) => state.plugins?.Dashboard?.metaFields,
// );

  return (
    <div>
      <Dashboard uppy={uppy} />
    </div>
    
  )
}