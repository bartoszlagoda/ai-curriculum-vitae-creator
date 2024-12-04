import { MoreVertical, Notebook } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


function ResumeCardItem({ resume }) {
  return (
    <div>
      <Link to={'/dashboard/resume/' + resume.documentId + "/edit"}>
        <div className='p-14 bg-gradient-to-b 
      from-pink-100 via-purple-200 to-blue-200
      flex
      items-center justify-center h-[280px] 
      border-t-4 rounded-2xl
      hover:scale-105 transition-all hover:shadow-md shadow-primary'>
          <Notebook />
        </div>
      </Link>
      <div className='border p-3 flex justify-between text-white'
      style={{
        background:resume?.themeColor
      }}>
        <h2 className='text-sm'>{resume.title}</h2>
        <MoreVertical className='h-4 w-4 cursor-pointer'/>
      </div>
    </div>
  )
}

export default ResumeCardItem
