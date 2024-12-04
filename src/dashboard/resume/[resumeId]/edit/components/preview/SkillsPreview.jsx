import React from 'react';

function SkillsPreview({ resumeInfo }) {
  // Domyślny kolor, jeśli `themeColor` nie jest ustawiony
  const themeColor = resumeInfo?.themeColor || "#ff6666"; 

  // Warunek ochronny: jeśli brak danych, wyświetl informację
  if (!resumeInfo?.skills || !Array.isArray(resumeInfo.skills)) {
    console.warn("Skills data is missing or invalid");
    return <p className="text-sm text-gray-500">No skills to display.</p>;
  }

  return (
    <div className='my-6'>
      {/* Nagłówek sekcji */}
      <h2
        className='text-center font-bold text-sm mb-2'
        style={{ color: themeColor }}
      >
        Skills
      </h2>
      <hr style={{ borderColor: themeColor }} />

      {/* Lista umiejętności */}
      <div className='grid grid-cols-2 gap-3 my-4'>
        {resumeInfo.skills.length > 0 ? (
          resumeInfo.skills.map((skill, index) => (
            <div 
              key={skill.id || index} 
              className='flex items-center justify-between'
            >
              {/* Nazwa umiejętności */}
              <h2 className='text-xs'>{skill.name || "Unnamed Skill"}</h2>
              
              {/* Pasek oceny umiejętności */}
              <div className='h-2 bg-gray-200 w-[120px]'>
                <div
                  className='h-2'
                  style={{
                    backgroundColor: themeColor,
                    width: skill?.rating*20+'%' // Przeliczenie ratingu na procenty
                  }}
                ></div>
              </div>
            </div>
          ))
        ) : (
          // Fallback dla pustej listy umiejętności
          <p className="text-sm text-gray-500">No skills available</p>
        )}
      </div>
    </div>
  );
}

export default SkillsPreview;
