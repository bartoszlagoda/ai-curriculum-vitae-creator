import { Loader2Icon, MoreVertical, Notebook, Pen } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import GlobalApi from '../../../service/GlobalApi'
import { toast } from 'sonner'



function ResumeCardItem({ resume, refreshData }) {

  const navigateTo = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  // const onMenuClick=(url)=>{
  //   navigateTo(url);
  // }

  const onDelete=()=>{
    setLoading(true);
    GlobalApi.DeleteResumeById(resume.documentId).then(resp => {
      console.log(resp);
      toast('Resume deleted !');
      refreshData();
      setLoading(false);
      setOpenAlert(false);
    }, (error) => {
      setLoading(false);
    })
  }

  return (
    <div>
      <Link to={'/dashboard/resume/' + resume.documentId + "/edit"}>
        <div className='p-14 bg-gradient-to-b 
      from-pink-100 via-purple-200 to-blue-200
      flex
      items-center justify-center h-[280px] 
      border-t-4 rounded-2xl
      hover:scale-105 transition-all hover:shadow-md shadow-primary'
          style={{
            borderColor: resume?.themeColor
          }}>
          <Notebook />
        </div>
      </Link>
      <div className='border p-4 flex justify-between text-white rounded-b-lg shadow-lg'
        style={{
          background: resume?.themeColor
        }}>
        <h2 className='text-sm'>{resume.title}</h2>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className='h-4 w-4 cursor-pointer' />
          </DropdownMenuTrigger>
          <DropdownMenuContent>

            <DropdownMenuItem
              onClick={() => navigateTo('/dashboard/resume/' + resume.documentId + "/edit")}> <Pen /> Edit</DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigateTo('/my-resume/' + resume.documentId + "/view")}>View</DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigateTo('/my-resume/' + resume.documentId + "/view")}>Download</DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setOpenAlert(true)}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialog open={openAlert}>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setOpenAlert(false)}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onDelete}
                disabled={loading}>
                {loading ? <Loader2Icon className='animate-spin'/> : 'Delete'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>


      </div>
    </div>
  )
}

export default ResumeCardItem
