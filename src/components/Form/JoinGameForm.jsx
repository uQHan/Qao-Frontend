import { useRef } from 'react'
import { IoCloseSharp } from 'react-icons/io5'
import playSound from '@/helpers/playSound'
import { getQuestionsById } from '@/helpers/getQuestionsById';
import { useBoundStore } from '@/store/useBoundStore';

export default function JoinGameForm() {
   const { getQuestionsById } = useBoundStore(state => state)

   const dialog = useRef(null)

   function handleSubmit(e) {
      e.preventDefault()
      getQuestionsById(e.target.gameCode.value, e.target.playName.value)
   }

   return (
      <>
         <form onSubmit={handleSubmit} className='flex flex-col gap-4' id='joinGameForm'>
            <div className='flex flex-col sm:flex-row gap-4 sm:gap-8 mb-4 md:mb-8'>
               <div className='flex flex-col gap-4'>
                  <label className='flex flex-col'>
                     <span className='font-semibold mb-2'>Game Code or Link</span>
                     <input type='text' name='gameCode' className='p-2 border rounded' required />
                  </label>
               </div>
               <div className='flex flex-col gap-4'>
                  <label className='flex flex-col'>
                     <span className='font-semibold mb-2'>Player Name</span>
                     <input type='text' name='playName' className='p-2 border rounded' required />
                  </label>
               </div>
            </div>
            <button type='submit' className='btn-primary uppercase py-3 px-6 w-full tracking-widest'>Join Game</button>
         </form>
      </>
   )
}
