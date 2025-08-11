import type { SVGProps } from 'react';

export const IconLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    fill="none"
    {...props}
  >
    <defs>
      <linearGradient id="logo-gradient" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
        <stop stopColor="hsl(var(--primary))" />
        <stop offset="1" stopColor="hsl(var(--accent))" />
      </linearGradient>
      <linearGradient id="face-gradient" x1="50" y1="20" x2="50" y2="70" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4ddbff" />
        <stop offset="1" stopColor="#0077ff" />
      </linearGradient>
    </defs>
    <circle cx="50" cy="50" r="48" stroke="url(#logo-gradient)" strokeWidth="3" />
    
    {/* Stylized Face */}
    <path d="M50 30 C 55 25, 65 30, 68 40 C 72 55, 60 75, 50 75 C 40 75, 28 55, 32 40 C 35 30, 45 25, 50 30 Z" fill="url(#face-gradient)" opacity="0.8" />
    <path d="M45,45 Q50,50 55,45" stroke="white" strokeWidth="1.5" fill="none" />
    <path d="M40 60 C 45 65, 55 65, 60 60" stroke="white" strokeWidth="1.5" fill="none" />

    {/* Tech Lines */}
    <path d="M25 40 L 35 40 L 38 35" stroke="url(#logo-gradient)" strokeWidth="1.5" />
    <path d="M28 50 L 40 50" stroke="url(#logo-gradient)" strokeWidth="1.5" />
    <path d="M30 60 L 38 60 L 41 65" stroke="url(#logo-gradient)" strokeWidth="1.5" />
    
    <path d="M75 40 L 65 40 L 62 35" stroke="url(#logo-gradient)" strokeWidth="1.5" />
    <path d="M72 50 L 60 50" stroke="url(#logo-gradient)" strokeWidth="1.5" />
    <path d="M70 60 L 62 60 L 59 65" stroke="url(#logo-gradient)" strokeWidth="1.5" />
  </svg>
);


export const IconBitcoin = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M11.768 16.096c-1.12.34-2.404.112-3.296-.784a3.178 3.178 0 0 1-.784-3.296c.34-1.12.112-2.404-.784-3.296a3.178 3.178 0 0 1 2.512-4.928c1.12-.34 2.404-.112 3.296.784a3.178 3.178 0 0 1 .784 3.296c-.34 1.12-.112 2.404.784 3.296a3.178 3.178 0 0 1-2.512 4.928Z" />
    <path d="M10.5 7.5h3" />
    <path d="M10.5 10.5h3" />
    <path d="M10.5 13.5h3" />
    <path d="m12 16.5-.5-6" />
  </svg>
);

export const IconEthereum = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 2 6 12l6 10 6-10Z" />
    <path d="m6 12 6-4 6 4" />
    <path d="m6 12 6 10v-10" />
  </svg>
);

export const IconTether = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 2v20" />
    <path d="M4 12h16" />
    <path d="M15 12V6.5c0-1.28-1.2-2.5-3-2.5s-3 1.22-3 2.5V12" />
  </svg>
);

export const IconRipple = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M16 10c-2 0-3 1-3 1s-1-1-3-1-3 1-3 1" />
    <path d="M16 14c-2 0-3-1-3-1s-1 1-3 1-3-1-3-1" />
  </svg>
);

export const IconCardano = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 2 2 7l10 5 10-5-10-5z" />
    <path d="m2 17 10 5 10-5" />
    <path d="m2 12 10 5 10-5" />
  </svg>
);

export const IconSolana = (props: SVGProps<SVGSVGElement>) => (
    <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    {...props}
    >
        <path d="M4 18h16"/>
        <path d="M4 12.5h16"/>
        <path d="M4 7h16"/>
    </svg>
);

export const IconDogecoin = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 18a6 6 0 0 0 6-6 6 6 0 0 0-6-6" />
    <path d="M12 12v6" />
    <path d="M12 6v-4" />
    <path d="m18 6-4-4" />
  </svg>
);

export const IconGoogle = (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width="48px"
      height="48px"
      {...props}
    >
      <path
        fill="#FFC107"
        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
      />
      <path
        fill="#FF3D00"
        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
      />
      <path
        fill="#4CAF50"
        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
      />
      <path
        fill="#1976D2"
        d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C42.022,35.136,44,30.023,44,24C44,22.659,43.862,21.35,43.611,20.083z"
      />
    </svg>
);
