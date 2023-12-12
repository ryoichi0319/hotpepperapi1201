/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains:["imgfp.hotp.jp","webservice.recruit.co.jp",
                 "lh3.googleusercontent.com","res.cloudinary.com"]
    }, 
    async headers() {
        return [
          {
            source: "/api/:path*",
            headers: [
              { key: "Access-Control-Allow-Origin", value: "*" },
              { key: "Access-Control-Allow-Methods", value: "GET, OPTIONS" },
              { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization" },
            ],
          },
        ];
      },
    };
    
    module.exports = nextConfig;
