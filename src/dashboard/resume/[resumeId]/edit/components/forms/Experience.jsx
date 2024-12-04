import React, { useContext, useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import RichTextEditor from '../RichTextEditor';
import { ResumeInfoContext } from '../../../../../../context/ResumeInfoContext';
import GlobalApi from '../../../../../../../service/GlobalApi';
import { toast } from 'sonner';
import { LoaderCircle } from 'lucide-react';
import { useParams } from 'react-router-dom';

const formField = {
    title: "",
    companyName: "",
    city: "",
    state: "",
    startDate: "",
    endDate: "",
    workSummary: ""
}

function Experience() {

    const params = useParams();
    const [loading, setLoading] = useState(false);
    const [experienceList, setExperienceList] = useState([
        formField]);

    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

    useEffect(()=>{
        resumeInfo?.experience.length>0&&setExperienceList(resumeInfo?.experience)
        
    },[])

    const handleOnChange = (index, event) => {
        const newEntries = experienceList.slice();
        const { name, value } = event.target;
        newEntries[index][name] = value;
        setExperienceList(newEntries);

    }

    const AddNewExperience = () => {
        setExperienceList([...experienceList, {
            title:'',
            companyName:'',
            city:'',
            state:'',
            startDate:'',
            endDate:'',
            workSummary:'',
        }])
    }

    const RemoveExperience = () => {
        setExperienceList(experienceList => experienceList.slice(0, -1))
    }

    const handleRichTextEditor = (e, name, index) => {
        const newEntries = experienceList.slice();
        newEntries[index][name] = e.target.value;
        setExperienceList(newEntries);
    }

    useEffect(() => {
        setResumeInfo({
            ...resumeInfo,
            experience: experienceList
        });
    }, [experienceList])

    const onSave = () => {
        setLoading(true);
        const data = {
            data: {
                experience: experienceList.map(({id, ...rest}) => rest)
            }
        }

        GlobalApi.UpdateResumeDetail(params?.resumeid, data).then(resp => {
            console.log(resp);
            setLoading(false);
            toast("Details updated")
        }, (error) => {
            setLoading(false);
        })
    }

    return (
        <div>
            <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
                <h2 className='font-bold text-lg'>Professional Experience</h2>
                <p>Add your previous job experience</p>
                <div>
                    {experienceList.map((item, index) => (
                        <div key={index}>
                            <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                                <div>
                                    <label className='text-xs'>Position Title</label>
                                    <Input name="title" onChange={(event) => handleOnChange(index, event)} 
                                    defaultValue={item?.title}/>
                                </div>
                                <div>
                                    <label className='text-xs'>Company Name</label>
                                    <Input name="companyName" onChange={(event) => handleOnChange(index, event)}
                                    defaultValue={item?.companyName} />
                                </div>
                                <div>
                                    <label className='text-xs'>City</label>
                                    <Input name="city" onChange={(event) => handleOnChange(index, event)}
                                    defaultValue={item?.city} />
                                </div>
                                <div>
                                    <label className='text-xs'>State</label>
                                    <Input name="state" onChange={(event) => handleOnChange(index, event)}
                                    defaultValue={item?.state} />
                                </div>
                                <div>
                                    <label className='text-xs'>Start Date</label>
                                    <Input type="date" name="startDate" onChange={(event) => handleOnChange(index, event)}
                                    defaultValue={item?.startDate} />
                                </div>
                                <div>
                                    <label className='text-xs'>End Date</label>
                                    <Input type="date" name="endDate" onChange={(event) => handleOnChange(index, event)} 
                                    defaultValue={item?.endDate} />
                                </div>
                                <div className='col-span-2'>
                                    <RichTextEditor
                                        index={index}
                                        defaultValue={item.workSummary}
                                        onRichTextEditorChange={(event) => handleRichTextEditor(event, 'workSummary', index)} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='flex justify-between'>
                    <div className='flex gap-2'>
                        <Button variant='outline' onClick={AddNewExperience} className="text-primary"> + Add Experience Field</Button>
                        <Button variant='outline' onClick={RemoveExperience} className="text-primary"> - Remove</Button>
                    </div>
                    <Button type='submit' disabled={loading} onClick={()=>onSave()}>
                        {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Experience
