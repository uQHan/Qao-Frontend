import { useRef } from 'react'
import { IoCloseSharp } from 'react-icons/io5'
import playSound from '@/helpers/playSound'

export default function JoinGameForm() {
   const dialog = useRef(null)

   function handleSubmit(e) {
      e.preventDefault()
      // Backend params to be filled later
   }

   return (
      <>
         <div className='flex flex-col sm:flex-row gap-4 sm:gap-8 mb-4 md:mb-8'>
            <div className='flex flex-col gap-4'>
               <label className='flex flex-col'>
                  <span className='font-semibold mb-2'>Game Code or Link</span>
                  <input type='text' name='gameCode' className='p-2 border rounded' required />
               </label>
            </div>
         </div>
      </>
   )
}
