'use client';
import Footer from '@/components/Footer/Footer';
import About from '@/components/Home/About';
import Landing from '@/components/Home/Landing';
import Services from '@/components/Home/Services';
import Navbar from '@/components/Navbar/Navbar';
import { RecoilRoot } from 'recoil';

export default function Home() {
    return (
        <div>
            <RecoilRoot>
                <Navbar />
                <Landing />
                <About />
                <Services />
                <Footer />
            </RecoilRoot>
        </div>
    );
}
