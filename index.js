const addBtn = document.querySelector("#note_btn");
const main = document.querySelector("#main")

addBtn.addEventListener("click",()=>{
   addNote();
})

// <!-- <div class="note_box">
//             <div class="tool">
//             <i class="fa-solid fa-floppy-disk"></i>
//             <i class="fa-solid fa-trash"></i>
//             </div>
//             <textarea></textarea>
//         </div>     -->

const addNote =( text = "")=>{
   const note = document.createElement("div");
   note.classList.add("note_box");
   note.innerHTML = `
   <div class="tool">
            <i class="save fa-solid fa-floppy-disk"></i>
            <i class="delete fa-solid fa-trash"></i>
            </div>
            <textarea>${text}</textarea>
   `;
    

   //for delete the note   
   note.querySelector(".delete").addEventListener("click",function(){
    note.remove();
    saveNote();
   }) 

   //for save the note  
   note.querySelector(".save").addEventListener("click",()=>{
      saveNote();
   }) 
   
   // onfocus save the notes
   
   note.querySelector("textarea").addEventListener("focusout",()=>{
      saveNote();
   })



   //for adding new note
   main.appendChild(note);
   saveNote();

}

const saveNote =()=>{
   const notes = document.querySelectorAll(".note_box textarea");
   // console.log(notes)

   const data = [];
   // console.log(data)
   notes.forEach((note)=>{
      data.push(note.value);
   })


   if(data.length === 0){
      localStorage.removeItem("notes")
   }else{
      localStorage.setItem("notes",JSON.stringify(data))
   }
}

(
   function (){
      const LsNotes = JSON.parse(localStorage.getItem("notes"));
      if(LsNotes === null){
         addNote()
      }else{
         LsNotes.forEach((notes)=>{
            addNote(notes);
      })
      }     
   }
)()

