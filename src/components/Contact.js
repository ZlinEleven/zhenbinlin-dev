import React from 'react'

const Contact = () => {
  return (
    <div name='contact' className='w-full h-screen flex justify-center items-center p-4'>
      <form action="https://getform.io/f/77d35fe9-c101-4db8-8498-a98838ad1e30" method='POST' className='flex flex-col max-w-[600px] w-full'>
        <div className='w-full flex flex-col items-center'>
          <p className='text-4xl font-bold text-gray-700 inline '>Contact Me</p>
          <div className='flex flex-col md:flex-row text-gray-700 py-4'>
            <p>Feel free to contact me at&nbsp;</p>
            <u>zhenbin2004@gmail.com</u>
            <p>&nbsp;or submit the form below</p>
            </div>
        </div>
        <input className='bg-gray-100 p-3 my-3 rounded-md border border-gray-300' type='text' placeholder='Email' name='email' />
        <textarea className='bg-gray-100 p-3 my-3 rounded-md border border-gray-300' placeholder='Your message' rows='7' name='message' />
        <button className='text-white border-2 px-6 py-3 mx-auto flex justify-center rounded-full bg-[#0a192f] hover:bg-pink-600 duration-500' type="submit">
          Send message
        </button>
      </form>
    </div>
  )
}

export default Contact