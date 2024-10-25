"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import * as tus from 'tus-js-client'
export default function NewForm() {



let upload:any = null
let uploadIsRunning:any = false
const toggleBtn:any = useRef(null)
const input:any = useRef(null)
const progress:any = useRef(null)
const progressBar:any =  useRef(null)
const alertBox:any = useRef(null)
const [uploadList, setUploadList] =  useState([{
  name:"",
  size:"",
  url:""
}])
const chunkInput:any = useRef(null)
const [parallelInput, setParallel] = useState(1)
const [endpointInput, setEndPoint] = useState("https://tusd.tusdemo.net/files/")


function startUpload() {
    const file = input.current.files[0]
    // Only continue if a file has actually been selected.
    // IE will trigger a change event even if we reset the input element
    // using reset() and we do not want to blow up later.
    if (!file) {
      return
    }
  
    const endpoint = endpointInput
    let chunkSize = Number.parseInt(chunkInput.value, 10)
    if (Number.isNaN(chunkSize)) {
      chunkSize = Number.POSITIVE_INFINITY
    }
  
    let parallelUploads = Number.parseInt(parallelInput + "", 10)
    if (Number.isNaN(parallelUploads)) {
      parallelUploads = 1
    }
  
    toggleBtn.current.textContent = 'pause upload'
  
    const options = {
      endpoint,
      chunkSize,
      retryDelays: [0, 1000, 3000, 5000],
      parallelUploads,
      metadata: {
        filename: file.name,
        filetype: file.type,
      },
      onError(error:any) {
        if (error.originalRequest) {
          if (window.confirm(`Failed because: ${error}\nDo you want to retry?`)) {
            upload.start()
            uploadIsRunning = true
            return
          }
        } else {
          window.alert(`Failed because: ${error}`)
        }
  
        reset()
      },
      onProgress(bytesUploaded:any, bytesTotal:any) {
        const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2)
        progressBar.current.style.width = `${percentage}%`
        console.log(bytesUploaded, bytesTotal, `${percentage}%`)
      },
      onSuccess() {
        const anchor = document.createElement('a')
        anchor.textContent = `Download ${upload.file.name} (${upload.file.size} bytes)`
        anchor.href = upload.url
        anchor.className = 'btn btn-success'
        // uploadList.appendChild(anchor)
        setUploadList([ ...uploadList,{
          name: upload.file.name,
          size: upload.file.size,
          url: upload.url
        }])
  
        reset()
      },
    }
  
    upload = new tus.Upload(file, options)
    upload.findPreviousUploads().then((previousUploads:any) => {
      askToResumeUpload(previousUploads, upload)
  
      upload.start()
      uploadIsRunning = true
    })
  }


  function reset() {
    input.value = ''
    toggleBtn.current.textContent = 'start upload'
    upload = null
    uploadIsRunning = false
  }

  function askToResumeUpload(previousUploads:any, currentUpload:any) {
    if (previousUploads.length === 0) return
  
    let text = 'You tried to upload this file previously at these times:\n\n'
    previousUploads.forEach((previousUpload:any, index:any) => {
      text += `[${index}] ${previousUpload.creationTime}\n`
    })
    text +=
      '\nEnter the corresponding number to resume an upload or press Cancel to start a new upload'
  
    const answer:any = prompt(text)
    const index = Number.parseInt(answer, 10)
  
    if (!Number.isNaN(index) && previousUploads[index]) {
      currentUpload.resumeFromPreviousUpload(previousUploads[index])
    }
  }
  
  
useEffect( () => {

      if (!tus.isSupported) {
        alertBox.current.classList.remove('hidden')
      }

      if (!toggleBtn) {
        throw new Error('Toggle button not found on this page. Aborting upload-demo. ')
      }

},[])

    return (
        <div className="container p-8">
      <h1>tus-js-client demo - File Upload</h1>

      <p>
        This demo shows the basic functionality of the tus protocol. You can select a file using the
        controls below and start/pause the upload as you wish.
      </p>

      <p>
        For a prettier demo please go to the
        <a href="http://tus.io/demo.html">tus.io</a> website. This demo is just here to aid
        developers.
      </p>

      <p>
        A demo where a video is recorded from your webcam while being simultaneously uploaded, can
        be found <a href="./video.html">here</a>.
      </p>

      <div className="alert alert-warining hidden" id="support-alert" ref={alertBox}>
        <b>Warning!</b> Your browser does not seem to support the features necessary to run
        tus-js-client. The buttons below may work but probably will fail silently.
      </div>

      <br />

      <table>
        <tbody>
        <tr>
          <td>
            <label htmlFor="endpoint"> Upload endpoint: </label>
          </td>
          <td>
            <input
              type="text"
              id="endpoint"
              name="endpoint"
              value={endpointInput}
              onChange={(e:any) => setEndPoint(e.target.value)}
            />
          </td>
        </tr>
        <tr>
          <td>
            <label htmlFor="chunksize" > Chunk size (bytes): </label>
          </td>
          <td>
            <input type="number" id="chunksize" name="chunksize" ref={chunkInput} value={chunkInput.value} onChange={(e:any) => {
                chunkInput.value = e.target.value
            } } />
          </td>
        </tr>
        <tr>
          <td>
            <label htmlFor="paralleluploads" > Parallel upload requests: </label>
          </td>
          <td>
            <input type="number" id="paralleluploads" name="paralleluploads" value={parallelInput} onChange={ (e:any) => setParallel(e.target.value) } />
          </td>
        </tr>
        </tbody>
      </table>

      <br />

          <input type="file" ref={input} onChange={ (e:any) => startUpload() } />

      <br />
      <br />

      <div className="row">
        <div className="span8">
          <div className="progress progress-striped progress-success" ref={progress}>
            <div className="bar" ref={progressBar} style={{width: "0%"}}></div>
          </div>
        </div>
        <div className="span4">
          <button className="btn stop" id="toggle-btn" ref={toggleBtn} onClick={
            (e:any) => {
                e.preventDefault()
              
                if (upload) {
                  if (uploadIsRunning) {
                    upload.abort()
                    toggleBtn.current.textContent = 'resume upload'
                    uploadIsRunning = false
                  } else {
                    upload.start()
                    toggleBtn.current.textContent = 'pause upload'
                    uploadIsRunning = true
                  }
                } else if (input.current.files.length > 0) {
                  startUpload()
                } else {
                  input.click()
                }
              }
          } >start upload</button>
        </div>
      </div>

      <hr />
      <h3>Uploads</h3>
      <p id="upload-list">Succesful uploads will be listed here. Try one!</p>
      <ol>
          {
            uploadList.map((file:any, key:any) => {
              return (
                <li key={key}><Link  href={file.url}>{file.name + " " + file.size}</Link></li>
              )
            })
          }
      </ol>
    </div>
    )
}