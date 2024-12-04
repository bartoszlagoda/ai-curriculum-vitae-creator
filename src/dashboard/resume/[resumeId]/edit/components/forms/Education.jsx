import React, { useContext, useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { LoaderCircle } from 'lucide-react';
import { ResumeInfoContext } from '../../../../../../context/ResumeInfoContext';
import { useParams } from 'react-router-dom';
import GlobalApi from '../../../../../../../service/GlobalApi';
import { toast } from 'sonner';

function Education({ enabledNext }) {

    const params = useParams();
    const [loading, setLoading] = useState(false);
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [educationInfoList, setEducationInfoList] = useState([
        {
            universityName: '',
            degree: '',
            major: '',
            startDate: '',
            endDate: '',
            description: ''
        }
    ])

    useEffect(()=>{
        resumeInfo&&setEducationInfoList(resumeInfo?.education)
      },[])

    const handleChange = (event, index) => {
        const newEntries = educationInfoList.slice();
        const { name, value } = event.target;
        newEntries[index][name] = value;
        setEducationInfoList(newEntries);
    }

    const AddNewEducation = () => {
        setEducationInfoList([...educationInfoList, {
            universityName: '',
            degree: '',
            major: '',
            startDate: '',
            endDate: '',
            description: ''
        }])
    }

    const RemoveEducation = () => {
        setEducationInfoList(educationInfoList => educationInfoList.slice(0, -1))
    }

    const onSave = () => {
        setLoading(true)
        const data={
            data:{
                education: educationInfoList.map(({id, ...rest}) => rest)
            }
        }

        console.log("Data being sent to API:", data); // Logowanie danych

        GlobalApi.UpdateResumeDetail(params?.resumeid, data).then(resp => {
            console.log(resp);
            setLoading(false);
            toast("Details updated")
        }, (error) => {
            setLoading(false);
            toast("Failed to update details")
        })
    }

    useEffect(() => {
        setResumeInfo({
            ...resumeInfo,
            education: educationInfoList
        })
    }, [educationInfoList])

    return (
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
            <h2 className='font-bold text-lg'>Education</h2>
            <p>Add your education details</p>
            <div>
                {educationInfoList.map((item, index) => (
                    <div key={index}>
                        <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                            <div className='col-span-2'>
                                <label>University Name</label>
                                <Input name='universityName' 
                                 defaultValue={item?.universityName} onChange={(e) => handleChange(e, index)} />
                            </div>
                            <div>
                                <label>Degree</label>
                                <Input name='degree' 
                                defaultValue={item?.degree} onChange={(e) => handleChange(e, index)} />
                            </div>
                            <div>
                                <label>Major</label>
                                <Input name='major' 
                                defaultValue={item?.major} onChange={(e) => handleChange(e, index)} />
                            </div>
                            <div>
                                <label>Start Date</label>
                                <Input type="date" name='startDate' 
                                defaultValue={item?.startDate} onChange={(e) => handleChange(e, index)} />
                            </div>
                            <div>
                                <label>End Date</label>
                                <Input type="date" name='endDate' 
                                defaultValue={item?.endDate} onChange={(e) => handleChange(e, index)} />
                            </div>
                            <div className='col-span-2'>
                                <label>Description</label>
                                <Textarea name='description' 
                                defaultValue={item?.description} onChange={(e) => handleChange(e, index)} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='flex justify-between'>
                <div className='flex gap-2'>
                    <Button variant='outline' onClick={AddNewEducation} className="text-primary"> + Add Experience Field</Button>
                    <Button variant='outline' onClick={RemoveEducation} className="text-primary"> - Remove</Button>
                </div>
                <Button type='submit'
                    disabled={loading}
                    onClick={() => onSave()}>
                    {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                </Button>
            </div>
        </div>
    )
}

export default Education
