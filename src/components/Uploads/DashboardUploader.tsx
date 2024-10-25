"use client"

import Uppy from '@uppy/core';
import { useState } from 'react';
import { Dashboard  } from '@uppy/react';
import Tus from '@uppy/tus';
import GoldenRetriever from '@uppy/golden-retriever';
import Compressor from '@uppy/compressor';

const MainUppy = new Uppy()
.use(Tus, { endpoint: 'https://tusd.tusdemo.net/files/', storeFingerprintForResuming : true })
.use(GoldenRetriever,{ serviceWorker: true })
.use(Compressor)


export default function DashboardUploader({id} : any) {

    const [uppy] = useState(() => MainUppy);

    return (
        <div>
          <Dashboard id={id} uppy={uppy} />
        </div>
      )
}