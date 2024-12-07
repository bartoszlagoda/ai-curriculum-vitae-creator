import React, { useContext, useEffect, useState } from 'react'
import Header from '../../../components/custom/Header'
import { Button } from '@/components/ui/button'
import ResumePreview from '../../../dashboard/resume/[resumeId]/edit/components/ResumePreview'
import { ResumeInfoContext } from '../../../context/ResumeInfoContext'
import GlobalApi from '../../../../service/GlobalApi'
import { useParams } from 'react-router-dom'
import { RWebShare } from 'react-web-share'

function ViewResume() {

    const { resumeid } = useParams();
    const [resumeInfo, setResumeInfo] = useState();

    useEffect(() => {
        GetResumeInfo();
    }, [])

    const GetResumeInfo = () => {
        GlobalApi.GetResumeById(resumeid).then(resp => {
            console.log(resp.data.data)
            setResumeInfo(resp.data.data)
        })
    }

    const HandleDownload = () => {
        window.print();
    }

    return (
        <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
            <div id='no-print-area'>
                <Header />
                <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
                    <h2 className='text-center text-2xl font-medium'
                    >You did it! Your CV is ready to download!</h2>
                    <p className='text-center text-gray-400'>Now you are ready to download your resume and you can share unique resume url with your friends and family</p>
                    <div className='flex justify-between px-44 my-10'>
                        <Button onClick={HandleDownload}>Download</Button>
                        <RWebShare
                            data={{
                                text: "Here is the link to my CV, where you can view and download it.",
                                url: import.meta.env.VITE_BASE_URL + "/my-resume/"+resumeid+"/view",
                                title: resumeInfo?.firstName + " " + resumeInfo?.lastName + " resume",
                            }}
                            onClick={() => console.log("shared successfully!")}
                        >
                            <Button>Share</Button>
                        </RWebShare>
                    </div>
                </div>
            </div>
            <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
                <div id='print-area'>
                    <ResumePreview />
                </div>
            </div>

        </ResumeInfoContext.Provider>
    )
}

export default ViewResume
