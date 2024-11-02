
const generateRandomIrab = (correctIrab) => {
    const roles = [
        "اسم موصول", "مفعول فيه", "ظرف زمان", "مبتدأ", "خبر", "فاعل", "مفعول به",
        "حال", "تمييز", "مضاف إليه", "نعت", "عطف بيان", "توكيد", "بدل", "مفعول مطلق",
        "مفعول لأجله", "مفعول معه", "مستثنى", "منادى", "اسم إن", "خبر إن", "اسم كان",
        "خبر كان", "نائب فاعل", "حرف جر", "حرف توكيد ونصب", "حرف عطف", "اسم مجرور"
    ];
  
    const cases = ["مرفوع", "منصوب", "مجرور", "مجزوم", "مبني"];
  
    const caseMarkers = {
        "مرفوع": ["الضمة", "الواو", "الألف", "ثبوت النون"],
        "منصوب": ["الفتحة", "الألف", "الياء", "الكسرة", "حذف النون"],
        "مجرور": ["الكسرة", "الياء", "الفتحة"],
        "مجزوم": ["السكون", "حذف حرف العلة", "حذف النون"]
    };
  
    let randomChoices = [];
  
    while (randomChoices.length < 3) {
        const role = roles[Math.floor(Math.random() * roles.length)];
        const grammaticalCase = cases[Math.floor(Math.random() * cases.length)];
  
        let caseDescription;
  
        if (grammaticalCase === "مبني") {
            caseDescription = `مبني على ${["الضم", "الفتح", "الكسر", "السكون"][Math.floor(Math.random() * 4)]}`;
        } else {
            const marker = caseMarkers[grammaticalCase] ? 
                            caseMarkers[grammaticalCase][Math.floor(Math.random() * caseMarkers[grammaticalCase].length)] : 
                            "علامة غير محددة";
  
            const caseMarker = {
                "مرفوع": "رفعه",
                "منصوب": "نصبه",
                "مجرور": "جره",
                "مجزوم": "جزمه"
            }[grammaticalCase] || "إعرابه";
  
            caseDescription = `${grammaticalCase} وعلامة ${caseMarker} ${marker}`;
        }
  
        let irab = `${role} ${caseDescription}`;
  
        // Avoid repetition of words
        irab = [...new Set(irab.split(' '))].join(' ');
  
        // Ensure uniqueness of irab
        if (!randomChoices.includes(irab)) {
            randomChoices.push(irab);
        }
    }
  
    // Add the correct irab (4th choice)
    randomChoices.push(correctIrab);
  
    // Shuffle the list to randomize the order, including the correct answer
    randomChoices = randomChoices.sort(() => Math.random() - 0.5);
  
    return randomChoices;
  };
  
  // Example usage:
  const randomChoices = generateRandomIrab("فاعل مرفوع وعلامة رفعه الضمة");
  console.log(randomChoices);