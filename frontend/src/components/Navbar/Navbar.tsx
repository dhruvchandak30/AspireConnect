'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from '@/store/atoms/userState';
import logo from '../../assets/logo_withoutName.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const setUser = useSetRecoilState(userState);
  const user = useRecoilValue(userState);
  const [id, setId] = useState(user.id);
  const router = useRouter();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const logoutHandler = () => {
    setUser({
      email: '',
      firstName: '',
      lastName: '',
      id: '',
      image_url: '',
    });
    setId('');
  };

  useEffect(() => {
    setId(user.id);
  }, [user]);

  return (
    <div className="bg-white border-b-2 flex flex-col lg:flex-row justify-between items-center px-8 border-black shadow-md p-4">
      <div className="flex justify-between items-center">
        <button onClick={() => router.push('/')} className="flex items-center">
          <Image src={logo} alt="Aspire" className="w-[2rem]" />
        </button>
        <button className="lg:hidden text-black" onClick={toggleMenu}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={
                isOpen
                  ? 'M6 18L18 6M6 6l12 12'
                  : 'M4 6h16M4 12h16m-7 6h7'
              }
            ></path>
          </svg>
        </button>
      </div>
      <div
        className={`${
          isOpen ? 'flex' : 'hidden'
        } flex-col lg:flex lg:flex-row gap-8 w-full lg:w-auto`}
      >
        <div>
          <button
            onClick={() => {
              toggleMenu();
              router.push('/');
            }}
            className="text-lg font-medium hover:text-[#ff4b2b] transition duration-300"
          >
            Home
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              toggleMenu();
              router.push('/completeprofile');
            }}
            className="text-lg font-medium hover:text-[#ff4b2b] transition duration-300"
          >
            Complete Profile
          </button>
        </div>
        {id === '' && (
          <div className="flex lg:flex-row flex-col gap-8">
            <div>
              <button
                onClick={() => {
                  toggleMenu();
                  router.push('/signin');
                }}
                className="text-lg font-medium hover:text-[#ff4b2b] transition duration-300"
              >
                Sign In
              </button>
            </div>
            <div>
              <button
                onClick={() => {
                  toggleMenu();
                  router.push('/signup');
                }}
                className="text-lg font-medium hover:text-[#ff4b2b] transition duration-300"
              >
                Sign Up
              </button>
            </div>
          </div>
        )}
        {id !== '' && (
          <div>
            <button
              onClick={() => {
                toggleMenu();
                logoutHandler();
                router.push('/');
              }}
              className="text-lg font-medium hover:text-[#ff4b2b] transition duration-300"
            >
              Log Out
            </button>
          </div>
        )}
        <div>
          <button
            onClick={() => {
              toggleMenu();
              router.push('/contact');
            }}
            className="text-lg font-medium hover:text-[#ff4b2b] transition duration-300"
          >
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
