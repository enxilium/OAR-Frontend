import { Button, TextField } from "@mui/material";
import Image from "next/image";
import { ThemeProvider } from '@mui/material/styles';
import theme from '../components/theme';

export default function Home() {
  return (
    <div>
      <div className="flex h-screen">
        <div className="flex-auto h-full justify-items-center"
        style={{ 
          flex: '6 3 auto',
          backgroundImage: "url('/assets/images/spider.png')",
          backgroundPosition: "calc(60%)", // Adjust these values for precise positioning
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover" }}
        >
          <Image
            src="/assets/images/OAR.png"
            alt="Logo"
            width={175}
            height={175}
            className="mt-12"
          />
          <p className="tracking-[0.6em] text-secondary m-4">MAKING RETOPOLOGY EASY</p>
        </div>

        <div className="relative flex-auto bg-background flex items-center justify-center" style={{ flex: '3 6 auto' }}>
          <div className="relative opacity-[100] flex items-center flex-col w-4/5 h-1/3 bg-gradient-to-b from-[#060418] to-[#0d0a2b] rounded-lg p-8 z-50">
            <Image
              src="/assets/images/logo.png"
              alt="CTA"
              width={225}
              height={225}
              className = "z-50 opacity-[100]"
            />

            <p className="tracking-[0.6em] text-xs text-secondary mt-4">EMPOWERING CREATIVES</p>
            <div className="flex flex-col space-y-4 w-full items-center justify-center">
              <TextField id="standard-basic" label="Username" variant="standard" className="w-5/6"/>
              <TextField id="standard-basic" label="Password" variant="standard" className="w-5/6" />
              <Button variant="contained" className="w-5/6" style={{ marginTop: '2rem' }}>Login</Button>
            </div>
          </div>
        </div>
      </div>
      <Image
        src="/assets/images/fade.png"
        alt="Hero"
        fill
        className="opacity-[0.78] z-0 absolute"
      />
    </div>
  );
}
