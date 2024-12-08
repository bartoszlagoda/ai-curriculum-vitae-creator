import React from 'react'

function PersonalDetailPreview({ resumeInfo }) {

  // Domyślny kolor, jeśli `themeColor` nie jest ustawiony
  const themeColor = resumeInfo?.themeColor || "#ff6666";

  return (
    <div className="flex items-center justify-center gap-20">
      {/* Zdjęcie */}
      {resumeInfo?.photo && (
        <img
          src={resumeInfo?.photo}
          alt="Profile"
          className="w-20 h-20 object-cover rounded-full border"
        />
      )}
      {/* Detale personalne */}
      <div>
        <h2 className='font-bold text-xl text-center'
          style={{
            color: themeColor
          }}>
          {resumeInfo?.firstName} {resumeInfo?.lastName}
        </h2>
        <h2 className='text-center text-sm font-medium'
          style={{
            color: 'black'
          }}>
          {resumeInfo?.jobTitle}
        </h2>
        <h2 className='text-center font-normal text-xs'
          style={{
            color: themeColor
          }}>
          {resumeInfo?.address}
        </h2>
        {/* <div className='flex justify-between'> */}
          <h2 className='text-center font-normal text-xs'
            style={{
              color: themeColor
            }}>
            {resumeInfo?.phone}
          </h2>
          <h2 className='text-center font-normal text-xs'
            style={{
              color: themeColor
            }}>
            {resumeInfo?.email}
          </h2>
        {/* </div> */}
      </div>
      <hr className='border-[1.5px] my-2'
        style={{
          borderColor: themeColor
        }} />
    </div>
  )
}

export default PersonalDetailPreview
