import { Brain, LoaderCircle } from 'lucide-react';
import React, { useContext, useState } from 'react'
import { Button } from '@/components/ui/button'
import { BtnBold, BtnBulletList, BtnClearFormatting, BtnItalic, BtnLink, BtnNumberedList, BtnStrikeThrough, BtnStyles, BtnUnderline, Editor, EditorProvider, HtmlButton, Separator, Toolbar } from 'react-simple-wysiwyg'
import { ResumeInfoContext } from '../../../../../context/ResumeInfoContext';
import { toast } from 'sonner';
import { AIchatSession } from '../../../../../../service/AIModal';

const PROMPT = "Position Title: {positionTitle}, Company Name: {companyName}, Depends on Position Title, Company Name give me summary for my job position within 4-5 lines"

function RichTextEditor({onRichTextEditorChange,index,defaultValue}) {
    const [value,setValue]=useState(defaultValue);
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);
    const [loading,setLoading]=useState(false); 
    
    const GenerateSummaryFromAI=async()=>{

      if(!resumeInfo.experience[index].title){
        toast('Please add position title');
        return ;
      }

      setLoading(true)

      const prompt=PROMPT.replace('{positionTitle}',resumeInfo.experience[index].title)
      .replace('{companyName}',resumeInfo.experience[index].companyName);
      console.log(prompt);
      const result=await AIchatSession.sendMessage(prompt);
      console.log(result.response.text());
      const resp=result.response.text()
      setValue(resp.replace('[','').replace(']',''));
      setLoading(false)
    }
  return (
    <div>
      <div className='flex justify-between'>
        <label className='text-xs'>Professional Experience Summary</label>
        <Button variant="outline" size="sm"
        onClick={GenerateSummaryFromAI} 
        className='flex gap-2 border-primary text-primary'>
          {loading?
          <LoaderCircle className='animate-spin'/>:
          <>
          <Brain className='h-4 w-4'/> Generate from AI
          </>
          } </Button>
      </div>
      <EditorProvider>
        <Editor 
        value={defaultValue} onChange={(e)=>{
            setValue(e.target.value);
            onRichTextEditorChange(e)
        }}>
            <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline/>
            <BtnStrikeThrough/>
            <Separator/>
            <BtnNumberedList/>
            <BtnBulletList/>
            <Separator/>
            <BtnLink/>
            <BtnClearFormatting/>
            <HtmlButton/>
            <Separator/>
            <BtnStyles/>
            </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  )
}

export default RichTextEditor
