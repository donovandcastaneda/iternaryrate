import CardContainer from '@/src/components/card-container';
import LoginForm from '@/src/components/login-fom';
import { FC } from 'react'



const page: FC = ({}) => {
  return <div className='min-h-screen w-full bg-gray-100 flex justify-center items-center p-4 text-center'>


  <CardContainer>

  <LoginForm/>


  </CardContainer>



  </div>
  


 
  
  
  
}

export default page