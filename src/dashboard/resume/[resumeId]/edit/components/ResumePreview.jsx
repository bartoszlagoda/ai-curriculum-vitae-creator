import React, { useContext, useEffect } from 'react'
import { ResumeInfoContext } from '../../../../../context/ResumeInfoContext'
import PersonalDetailPreview from './preview/PersonalDetailPreview'
import SummaryPreview from './preview/SummaryPreview'
import ProfessionalExperiencePreview from './preview/ProfessionalExperiencePreview'
import EducationalPreview from './preview/EducationalPreview'
import SkillsPreview from './preview/SkillsPreview'

function ResumePreview() {

  const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext)

  return (
    <div className='shadow-lg h-full p-14 border-t-[20px]' 
    style={{
      borderColor:resumeInfo?.themeColor
    }}>
      {/* Personal Detail */}
      <PersonalDetailPreview resumeInfo={resumeInfo} />

      {/* Summary */}
      <SummaryPreview resumeInfo={resumeInfo}/>

      {/* Professional experience */}
      {resumeInfo?.experience?.length>0&& <ProfessionalExperiencePreview resumeInfo={resumeInfo}/>}

      {/* Educational */}
      {resumeInfo?.education?.length>0&& <EducationalPreview resumeInfo={resumeInfo}/>}

      {/* Skills */}
      {resumeInfo?.skills?.length>0&& <SkillsPreview resumeInfo={resumeInfo}/>}

      
    </div>
  )
}

export default ResumePreview
